import Image from 'next/image'

export default function Page() {
  return (
    <>
      <section>
        <div className="container px-6 py-10 mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold capitalize lg:text-3xl">
              recent posts
            </h1>
          </div>

          <div className="divider"></div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            <div>
              <Image
                height={475}
                width={320}
                className="object-cover object-center w-full h-64 rounded-lg lg:h-80"
                src="/img/blog/7.jpg"
                alt=""
              />

              <div className="mt-8">
                <span className="text-primary uppercase">category</span>

                <h1 className="mt-4 text-xl font-semibold">
                  Unleashing Your Inner Athlete: Tips for Peak Performance
                </h1>

                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
                  est asperiores vel, ab animi recusandae nulla veritatis id
                  tempore sapiente
                </p>

                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm">February 1, 2022</p>

                  <a href="#" className="text-primary link-hover">
                    Read more
                  </a>
                </div>
              </div>
            </div>

            <div>
              <Image
                height={475}
                width={320}
                className="object-cover object-center w-full h-64 rounded-lg lg:h-80"
                src="/img/blog/8.jpg"
                alt=""
              />

              <div className="mt-8">
                <span className="text-primary uppercase">category</span>

                <h1 className="mt-4 text-xl font-semibold">
                  From Couch to Champion: Transforming Your Fitness Journey
                </h1>

                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
                  est asperiores vel, ab animi recusandae nulla veritatis id
                  tempore sapiente
                </p>

                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm">February 6, 2022</p>

                  <a href="#" className="text-primary link-hover">
                    Read more
                  </a>
                </div>
              </div>
            </div>

            <div>
              <Image
                height={475}
                width={320}
                className="object-cover object-center w-full h-64 rounded-lg lg:h-80"
                src="/img/blog/9.jpg"
                alt=""
              />

              <div className="mt-8">
                <span className="text-primary uppercase">category</span>

                <h1 className="mt-4 text-xl font-semibold">
                  Sports Psychology: Harnessing the Power of the Mind in
                  Athletics
                </h1>

                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
                  est asperiores vel, ab animi recusandae nulla veritatis id
                  tempore sapiente
                </p>

                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm">February 19, 2022</p>

                  <a href="#" className="text-primary link-hover">
                    Read more
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container px-6 py-10 mx-auto">
          <div className="divider"></div>

          <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2">
            <div className="lg:flex">
              <Image
                height={224}
                width={256}
                className="object-cover w-full h-56 rounded-lg lg:w-64"
                src="/img/blog/1.jpg"
                alt=""
              />

              <div className="flex flex-col justify-between py-6 lg:mx-6">
                <a href="#" className="text-xl font-semibold hover:underline">
                  Breaking Barriers: Inspiring Stories of Athletes Overcoming
                  Challenges
                </a>

                <span className="text-sm">On: 20 October 2019</span>
              </div>
            </div>

            <div className="lg:flex">
              <Image
                height={224}
                width={256}
                className="object-cover w-full h-56 rounded-lg lg:w-64"
                src="/img/blog/2.jpg"
                alt=""
              />

              <div className="flex flex-col justify-between py-6 lg:mx-6">
                <a href="#" className="text-xl font-semibold hover:underline">
                  Game On: Strategies for Mental Toughness in Sports
                </a>

                <span className="text-sm">On: 20 October 2019</span>
              </div>
            </div>

            <div className="lg:flex">
              <Image
                height={224}
                width={256}
                className="object-cover w-full h-56 rounded-lg lg:w-64"
                src="/img/blog/3.jpg"
                alt=""
              />

              <div className="flex flex-col justify-between py-6 lg:mx-6">
                <a href="#" className="text-xl font-semibold hover:underline">
                  The Science Behind Athletic Performance: Training Techniques
                  and Innovations
                </a>

                <span className="text-sm">On: 25 November 2020</span>
              </div>
            </div>

            <div className="lg:flex">
              <Image
                height={224}
                width={256}
                className="object-cover w-full h-56 rounded-lg lg:w-64"
                src="/img/blog/4.jpg"
                alt=""
              />

              <div className="flex flex-col justify-between py-6 lg:mx-6">
                <a href="#" className="text-xl font-semibold hover:underline">
                  Athlete&apos;s Arsenal: Essential Gear and Equipment for Every
                  Sport
                </a>

                <span className="text-sm">On: 30 September 2020</span>
              </div>
            </div>

            <div className="lg:flex">
              <Image
                height={224}
                width={256}
                className="object-cover w-full h-56 rounded-lg lg:w-64"
                src="/img/blog/5.jpg"
                alt=""
              />

              <div className="flex flex-col justify-between py-6 lg:mx-6">
                <a href="#" className="text-xl font-semibold hover:underline">
                  Injury Prevention and Recovery: Taking Care of Your Body for
                  Longevity in Sports
                </a>

                <span className="text-sm">On: 13 October 2019</span>
              </div>
            </div>

            <div className="lg:flex">
              <Image
                height={224}
                width={256}
                className="object-cover w-full h-56 rounded-lg lg:w-64"
                src="/img/blog/6.jpg"
                alt=""
              />

              <div className="flex flex-col justify-between py-6 lg:mx-6">
                <a href="#" className="text-xl font-semibold hover:underline">
                  Mastering the Game: Skills and Drills for Athletes of All
                  Levels
                </a>

                <span className="text-sm">On: 20 October 2019</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
