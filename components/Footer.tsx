import { FC } from 'react'
import {
  FaEnvelope,
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaRunning,
  FaTwitter,
} from 'react-icons/fa'

const Footer: FC = () => {
  const socials = [
    { icon: FaFacebookF, href: '#!' },
    { icon: FaTwitter, href: '#!' },
    { icon: FaInstagram, href: '#!' },
    { icon: FaLinkedinIn, href: 'https://www.linkedin.com/in/ldaniel38/' },
    { icon: FaGithub, href: 'https://github.com/ldanieldev?tab=repositories' },
  ]

  return (
    <footer className="bg-accent text-center shadow-md lg:text-left">
      <div className="flex items-center justify-center border-y-2 md:border-t-0 border-neutral-200 p-6 lg:justify-between">
        <div className="mr-12 hidden lg:block">
          <span className="font-medium">
            Get connected with us on social networks:
          </span>
        </div>

        <div className="flex justify-center">
          {socials.map((social, idx) => (
            <a
              key={idx}
              href={social.href}
              target="_blank"
              className="mr-4 text-base link-hover hover:bg-secondary hover:text-white rounded-full p-2"
            >
              {<social.icon size={24} />}
            </a>
          ))}
        </div>
      </div>

      <div className="mx-6 py-10 text-center md:text-left">
        <div className="grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h6 className="mb-4 flex items-center justify-center font-bold uppercase md:justify-start">
              <FaRunning className="fill-cyan-600 mr-2" size={48} />
              Athletic Outlet
            </h6>
            <p>
              We are committed to being the go-to destination for athletes of
              all levels, offering a wide selection of top-notch sports
              equipment, exceptional customer service, and a passion for helping
              our customers reach their full athletic potential.
            </p>
          </div>

          <div className="flex flex-col gap-8">
            <h6 className="font-semibold uppercase border-y-2 md:border-t-0 md:w-2/3">
              Products
            </h6>

            <a href="#" className="text-base link-hover">
              Calisthenics
            </a>
            <a href="#" className="text-base link-hover">
              Cardio
            </a>
            <a href="#" className="text-base link-hover">
              WeightLifting
            </a>
          </div>

          <div className="flex flex-col gap-8">
            <h6 className="font-semibold uppercase border-y-2 md:border-t-0 md:w-2/3">
              Useful links
            </h6>

            <a href="#" className="text-base link-hover">
              Settings
            </a>
            <a href="#" className="text-base link-hover">
              Orders
            </a>

            <a href="#" className="text-base link-hover">
              Help
            </a>
          </div>

          <div>
            <h6 className="font-semibold uppercase border-y-2 md:border-t-0 md:w-2/3 mb-10">
              Contact
            </h6>

            <div className="flex flex-col gap-2">
              <p className="mb-4 flex items-center justify-center md:justify-start">
                <FaMapMarkerAlt className="mr-3" size={20} />
                New York, NY 10012, US
              </p>
              <p className="mb-4 flex items-center justify-center md:justify-start">
                <FaEnvelope className="mr-3" size={20} />
                <a className="link-hover" href="mailto:#">
                  Info@AthleticOutlet.com
                </a>
              </p>
              <p className="mb-4 flex items-center justify-center md:justify-start">
                <FaPhoneAlt className="mr-3" size={20} />
                <a className="link-hover" href="tel:+12345678888">
                  +1 234 567 8888
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-neutral p-6 text-center">
        <span>&copy; {new Date().getFullYear()} Copyright</span>
        <a
          className="font-semibold text-accent-content ml-2 link-hover"
          href="https://ldanieldev.com/"
        >
          LDanielDev
        </a>
      </div>
    </footer>
  )
}

export default Footer
