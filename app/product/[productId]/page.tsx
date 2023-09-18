import AddToCartButton from '@/components/Product/AddToCartButton'
import CrossSell from '@/components/Product/CrossSell'
import { notFound } from 'next/navigation'
import { ProductPlaceHolderImg } from '@/constants'
import Image from 'next/image'
import ImageGallery from '@/components/ImageGallery'

async function getProduct(id: string): Promise<IProduct> {
  const res = await fetch(`${process.env.API_URL}/api/products/${id}`)
  return res.json()
}

async function getCrossSellProducts(
  count = 3,
  category = ''
): Promise<IProductWithPopulatedCategories[]> {
  let url = `${process.env.API_URL}/api/products?cs=${count}`

  if (category) {
    url += `&category=${category}`
  }

  const res = await fetch(url)
  return res.json()
}

export default async function page({
  params,
}: {
  params: { productId: string }
}) {
  const product: IProduct = await getProduct(params.productId)

  if (!product) {
    notFound()
  }

  const crossSellProducts = await getCrossSellProducts(3, product.category)

  return (
    <>
      <section>
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
          <div className="">
            {product.images.length > 0 ? (
              <ImageGallery images={product.images} altText={product.name} />
            ) : (
              <Image
                src={ProductPlaceHolderImg.src}
                alt={product.name}
                height={500}
                width={500}
              />
            )}
          </div>

          <div className="lg:w-1/2">
            <h1 className="text-4xl font-bold my-4 text-center lg:text-left">
              {product.name}
            </h1>
            <h3 className="text-xl my-4 font-bold">
              $
              {new Intl.NumberFormat('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(product.price)}
            </h3>

            <p className="text-xl my-4">{product.description}</p>

            <p className="text-xl">In Stock: {product.countInStock}</p>

            <div className="divider my-4"></div>
            <AddToCartButton product={product} />

            <div tabIndex={0} className="mt-8 collapse collapse-arrow">
              <div className="collapse-title text-xl font-medium">Shipping</div>
              <div className="collapse-content">
                <ul>
                  <li>Free shipping on orders over $300</li>
                  <li>International shipping available</li>
                  <li>Expedited shipping options</li>
                  <li>Signature required upon delivery</li>
                </ul>
              </div>
            </div>
            <div className="divider my-1"></div>

            <div tabIndex={0} className="collapse collapse-arrow">
              <div className="collapse-title text-xl font-medium">Returns</div>
              <div className="collapse-content">
                <ul>
                  <li>Easy return requests</li>
                  <li>Pre-paid shipping label included</li>
                  <li>10% restocking fee for returns</li>
                  <li>60 day return window</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider"></div>

      <CrossSell products={crossSellProducts} />
    </>
  )
}
