import dynamic from 'next/dynamic'
import { FaEnvelope, FaMapMarkedAlt, FaPhone } from 'react-icons/fa'
import Image from 'next/image'
import BannerImage from '@/public/img/contact-banner.jpg'

const MapView = dynamic(() => import('@/components/MapView'), { ssr: false })

export default function Page() {
  return (
    <>
      <div className="container px-6 py-10 mx-auto">
        <div className="text-center">
          <p className="font-medium text-primary">Contact us</p>

          <h1 className="mt-2 text-2xl font-semibold md:text-3xl">
            We&apos;d love to hear from you
          </h1>

          <p className="mt-3 text-base-content/80">
            Chat to our friendly team.
          </p>
        </div>

        <Image
          className="object-cover w-full h-64 mt-10 rounded-lg lg:h-96"
          src={BannerImage.src}
          alt="contact our team"
          height={918}
          width={1632}
        />

        <div className="grid grid-cols-1 gap-12 mt-10 lg:grid-cols-3 sm:grid-cols-2 ">
          <div className="p-4 rounded-lg bg-accent md:p-6">
            <span className="inline-block p-3 text-white rounded-lg bg-primary/40">
              <FaEnvelope size={18} />
            </span>

            <h2 className="mt-4 text-base font-medium">Chat to sales</h2>
            <p className="mt-2 text-sm text-base-content/80">
              Speak to our friendly team.
            </p>
            <a href="mailto:#" className="mt-2 text-sm text-primary link-hover">
              Info@AthleticOutlet.com
            </a>
          </div>

          <div className="p-4 rounded-lg bg-accent md:p-6">
            <span className="inline-block p-3 text-white rounded-lg bg-primary/40">
              <FaMapMarkedAlt size={18} />
            </span>

            <h2 className="mt-4 text-base font-medium">Visit us</h2>
            <p className="mt-2 text-sm text-base-content/80">
              Visit our office HQ
            </p>
            <p className="mt-2 text-sm text-primary">New York, NY 10012, US</p>
          </div>

          <div className="p-4 rounded-lg bg-accent md:p-6">
            <span className="inline-block p-3 text-white rounded-lg bg-primary/40">
              <FaPhone size={18} />
            </span>

            <h2 className="mt-4 text-base font-medium">Call us</h2>
            <p className="mt-2 text-sm text-base-content/80">
              Mon-Fri from 8am to 5pm.
            </p>
            <a
              href="tel:+12345678888"
              className="mt-2 text-sm text-primary link-hover"
            >
              +1 (234) 567 8888
            </a>
          </div>
        </div>
      </div>

      <div className="container px-6 pb-10 mx-auto">
        <div className="grid grid-cols-1 gap-12 mt-10 lg:grid-cols-3">
          <div className="p-4 py-6 rounded-lg bg-accent md:p-8">
            <div className="text-center mb-2">
              <p className="font-medium text-primary">Contact us</p>

              <h1 className="mt-2 text-2xl font-semibold md:text-3xl">
                Get in touch
              </h1>

              <p className="mt-3 text-base-content/80">
                Our friendly team is always here to chat.
              </p>
            </div>

            <form className="form-control gap-4">
              <div className="md:items-center md:flex gap-4">
                <div>
                  <label className="label">First Name</label>
                  <input
                    type="text"
                    placeholder="John "
                    className="input input-bordered w-full"
                  />
                </div>

                <div>
                  <label className="label">Last Name</label>
                  <input
                    type="text"
                    placeholder="Doe"
                    className="input input-bordered w-full"
                  />
                </div>
              </div>

              <div>
                <label className="label">Email address</label>
                <input
                  type="email"
                  placeholder="johndoe@example.com"
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="label">Message</label>
                <textarea
                  className="textarea textarea-bordered w-full h-32"
                  placeholder="Message"
                ></textarea>
              </div>

              <button className="btn btn-primary w-full"> Send message</button>
            </form>
          </div>

          <div className="overflow-hidden rounded-lg lg:col-span-2 h-96 lg:h-full">
            <MapView
              latitude={40.72501}
              longitude={-73.998299}
              zoom={14}
              popupText="New York, NY 10012, US"
            />
          </div>
        </div>
      </div>
    </>
  )
}
