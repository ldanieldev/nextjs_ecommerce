import ProductCard from './ProductCard'

type props = {
  products: IProductWithPopulatedCategories[]
}

export default function CrossSell({ products }: props) {
  return (
    <>
      <div className="w-11/12 mx-auto my-8">
        <h1 className="font-bold mb-8 text-3xl text-center lg:text-left">
          Customers Also Purchased
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8 justify-items-center">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </>
  )
}
