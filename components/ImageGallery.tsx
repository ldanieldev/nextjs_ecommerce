'use client'
import Image from 'next/image'
import { useState } from 'react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import { FreeMode, Mousewheel, Navigation, Thumbs } from 'swiper/modules'
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react'

type props = {
  images: string[]
  altText?: string
}

export default function ImageGallery({ images, altText = '' }: props) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null)

  return (
    <>
      <Swiper
        style={{
          /* @ts-expect-error - https://github.com/nolimits4web/swiper/issues/6685 */
          '--swiper-navigation-color': 'hsl(var(--bc))',
          cursor: 'grab',
        }}
        loop={true}
        autoHeight={true}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        mousewheel={true}
        modules={[FreeMode, Navigation, Thumbs, Mousewheel]}
        className="mySwiper2"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Image
              style={{
                maxWidth: '500px',
                maxHeight: '500px',
                margin: '0 auto',
              }}
              src={image}
              height={500}
              width={500}
              alt={`${altText} image`}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {images.length > 1 && (
        <Swiper
          style={{
            marginTop: '10px',
            display: 'grid',
            justifyContent: 'center',
          }}
          onSwiper={setThumbsSwiper}
          spaceBetween={5}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper"
        >
          {images.map((image, index) => (
            <SwiperSlide
              key={index}
              style={{
                cursor: 'pointer',
              }}
            >
              <Image
                src={image}
                height={150}
                width={185}
                alt={`${altText} image thumbnail`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  )
}
