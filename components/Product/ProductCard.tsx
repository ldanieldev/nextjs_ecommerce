import Image from 'next/image'
import Link from 'next/link'
import AddToCartButton from './AddToCartButton'
// import ProductRating from './ProductRating'
import { ProductPlaceHolderImg } from '@/constants'
import { toDisplayPrice } from '@/utils/stringUtils'

type props = {
  product: {
    _id: string
    name: string
    images: string[]
    description: string
    brand: string
    category?: {
      _id: string
      name: string
      parent?: {
        _id: string
        name: string
      }
    }

    price: number
    // rating: number
    // numReviews: number
    countInStock: number
  }
}

export type TProductCard = props['product']

export default function ProductCard({
  product: {
    images,
    _id,
    name,
    description,
    brand,
    category,
    // rating,
    // numReviews,
    price,
    countInStock,
  },
}: props) {
  return (
    <div className="card w-96 bg-base-100 shadow-md hover:shadow-xl dark:shadow-gray-800">
      <Link href={`/product/${_id}`}>
        <figure className="rounded-t-2xl">
          <Image
            className="w-full max-h-72"
            src={images[0] || ProductPlaceHolderImg.src}
            alt="Shoes"
            width={510}
            height={640}
            priority
          />
        </figure>
      </Link>
      <div className="card-body">
        <h2 className="card-title inline-block overflow-ellipsis overflow-hidden whitespace-nowrap hover:underline">
          <Link href={`/product/${_id}`} title={name}>
            {name}
          </Link>
        </h2>
        <p className="font-bold text-xl">{toDisplayPrice(price)}</p>
        {/*<ProductRating rating={rating} totalReviews={numReviews} />*/}
        <p
          className="overflow-ellipsis overflow-hidden h-24"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 4,
            WebkitBoxOrient: 'vertical',
          }}
          title={description}
        >
          {description}
        </p>
        <p className="card-actions justify-around items-center my-2">
          <span className="badge badge-primary">{brand}</span>
          {category?.name && (
            <span className="badge badge-secondary">{category.name}</span>
          )}
          <span
            className={`badge badge-outline ${
              countInStock < 10 ? 'badge-warning' : 'badge-success'
            }`}
          >
            In Stock: {countInStock}
          </span>
        </p>
        <AddToCartButton product={{ price, _id, countInStock }} />
      </div>
    </div>
  )
}
