import ProductCard, { TProductCard } from '@/components/Product/ProductCard'

type props = { products: TProductCard[] }

export default function ProductGrid({ products }: props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8 justify-items-center">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  )
}
