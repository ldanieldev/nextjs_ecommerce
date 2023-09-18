import FeaturedProductBanner from '@/components/Product/FeaturedProductBanner'
import ProductGrid from '@/components/Product/ProductGrid'

export default async function Page() {
  const apiEndpoint = process.env.API_URL + '/api/products'
  const [featuredProductsResponse, recentProductsResponse] = await Promise.all([
    fetch(apiEndpoint + '?featured=true'),
    fetch(apiEndpoint + '?recent=true'),
  ])

  let [featuredProducts, recentProducts]: [
    IProduct | IProduct[],
    IProductWithPopulatedCategories | IProductWithPopulatedCategories[]
  ] = await Promise.all([
    featuredProductsResponse.json(),
    recentProductsResponse.json(),
  ])

  if (!Array.isArray(featuredProducts)) {
    featuredProducts = [featuredProducts]
  }
  if (!Array.isArray(recentProducts)) {
    recentProducts = [recentProducts]
  }

  return (
    <>
      {featuredProducts && featuredProducts.length > 0 && (
        <FeaturedProductBanner products={featuredProducts} />
      )}

      {recentProducts && recentProducts.length > 0 && (
        <div className="w-11/12 mx-auto my-8">
          <h1 className="font-bold mb-6 text-3xl text-center lg:text-left border-b-2">
            New Arrivals
          </h1>

          <ProductGrid products={recentProducts} />
        </div>
      )}
    </>
  )
}
