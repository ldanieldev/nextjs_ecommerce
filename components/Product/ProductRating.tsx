import { Fragment } from 'react'

type props = {
  rating: number
  totalReviews: number
}

export default function ProductRating({ rating, totalReviews }: props) {
  return (
    <div className="flex flex-row items-center">
      {[...Array(5)].map((item, index) => (
        <Fragment key={index}>
          <div
            className={`${
              rating < index + 0.5
                ? 'bg-base-300 dark:bg-zinc-600'
                : 'bg-base-content'
            } w-2 h-4 mask mask-star-2 mask-half-1`}
          ></div>
          <div
            className={`${
              rating < index + 1
                ? 'bg-base-300 dark:bg-zinc-600'
                : 'bg-base-content'
            }  w-2 h-4 mask mask-star-2 mask-half-2`}
          ></div>
        </Fragment>
      ))}
      &nbsp;({totalReviews})
    </div>
  )
}
