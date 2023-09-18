import ProductGrid from '@/components/Product/ProductGrid'

export default async function Page({
  params,
}: {
  params: { category: string }
}) {
  const response = await fetch(`${process.env.API_URL}/api/products`)

  let products:
    | IProductWithPopulatedCategories
    | IProductWithPopulatedCategories[] = await response.json()

  if (!Array.isArray(products)) {
    products = [products]
  }

  if (products.length > 0) {
    products = products.filter(
      (product) =>
        product.category &&
        (product.category.name.toLowerCase() ===
          params.category.toLowerCase() ||
          product.category.parent?.name.toLowerCase() ===
            params.category.toLowerCase().toLowerCase())
    )
  }

  return (
    <>
      <div className="w-11/12 mx-auto my-8">
        <h1 className="font-bold mb-6 text-3xl text-center lg:text-left border-b-2 capitalize">
          {params.category}
        </h1>

        <ProductGrid products={products} />
      </div>
    </>
  )
}
