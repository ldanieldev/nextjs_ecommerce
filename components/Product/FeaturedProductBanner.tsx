'use client'
import { ProductPlaceHolderImg } from '@/constants'
import { CartContext } from '@/contexts/Cart'
import { toDisplayPrice } from '@/utils/stringUtils'
import Image from 'next/image'
import Link from 'next/link'
import { useContext } from 'react'
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/pagination'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

type props = {
  products: IProduct[]
}

export default function FeaturedProductBanner({ products }: props) {
  const { addToCart } = useContext(CartContext)

  return (
    <>
      <Swiper
        style={{
          /* @ts-expect-error - https://github.com/nolimits4web/swiper/issues/6685 */
          '--swiper-pagination-bullet-inactive-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        autoplay={true}
        autoHeight={true}
        rewind={true}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination, Autoplay]}
        className="featuredProductsSwiper"
      >
        {products.map((product) => (
          <SwiperSlide key={product._id}>
            <div className="hero min-h-fit bg-neutral shadow-accent">
              <div className="hero-content flex-col lg:flex-row-reverse px-0 sm:px-4">
                <Link href={`product/${product._id}`}>
                  <Image
                    src={product.images[0] ?? ProductPlaceHolderImg.src}
                    className="max-w-sm sm:rounded-lg shadow-2xl"
                    height={500}
                    width={500}
                    alt={product.name}
                    priority={true}
                  />
                </Link>
                <div className="text-center sm:text-left">
                  <Link href={`product/${product._id}`}>
                    <h2 className="text-5xl font-bold">{product.name}</h2>
                    <p className="pt-6">{product.description}</p>
                    <p className="py-3 font-medium text-2xl">
                      {toDisplayPrice(product.price)}
                    </p>
                  </Link>
                  <button
                    className="btn btn-primary mb-4 sm:mb-0"
                    onClick={() => addToCart(product._id, product.price, 1)}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}
