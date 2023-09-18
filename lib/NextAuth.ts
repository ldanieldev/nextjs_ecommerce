import ConnectDB from '@/lib/mongoDB/connectDB'
import clientPromise from '@/lib/mongoDB/dbClient'
import User from '@/lib/mongoDB/models/user'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import bcrypt from 'bcryptjs'
import { AuthOptions, Session } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import { getServerSession } from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

const googleClientId: string | undefined = process.env.GOOGLE_ID,
  googleClientSecret: string | undefined = process.env.GOOGLE_SECRET

if (!googleClientId || !googleClientSecret) {
  throw new Error(
    'Missing/invalid Google provider environment variables settings.'
  )
}

export const authOptions: AuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      type: 'credentials',
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'JohnSnow@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      //@ts-expect-error - https://github.com/nextauthjs/next-auth/issues/2701
      async authorize(credentials) {
        if (!credentials) {
          throw new Error('Please provide your login credentials')
        }

        await ConnectDB()

        const user = await User.findOne({
          email: credentials.email,
        })

        if (!user) {
          throw new Error('This user does not exist. Please sign up first.')
        }

        if (!(await bcrypt.compare(credentials.password, user.password))) {
          throw new Error(
            'Incorrect login credentials provided. Please try again.'
          )
        }

        return user
      },
    }),
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          isAdmin: profile.isAdmin ?? false,
          address: '',
          city: '',
          state: '',
          zipCode: '',
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }): Promise<JWT> {
      if (account) {
        token.accessToken = account.access_token
        token.isAdmin = user.isAdmin ?? false
        token.address = user.address ?? ''
        token.state = user.state ?? ''
        token.city = user.city ?? ''
        token.zipCode = user.zipCode ?? ''
      }
      return token
    },
    async session({ session, token }): Promise<Session> {
      session.accessToken = token.accessToken
      session.user.isAdmin = token.isAdmin
      session.user.address = token.address
      session.user.state = token.state
      session.user.city = token.city
      session.user.zipCode = token.zipCode
      return session
    },
  },
  pages: {
    signIn: '/sign-in',
    newUser: '/profile',
    signOut: '/',
  },
  session: { strategy: 'jwt' },
  debug: process.env.NODE_ENV !== 'production',
}

export async function protectRoute(): Promise<void> {
  const session = await getServerSession(authOptions)
  if (!session?.user.isAdmin) {
    throw new Error('UnAuthorized Access')
  }
}

export async function protectUserRoute(userEmail: string): Promise<void> {
  const session = await getServerSession(authOptions)
  if (!session?.user.isAdmin || session?.user.email !== userEmail) {
    throw new Error('UnAuthorized Access')
  }
}
