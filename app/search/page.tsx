'use client'
import ProductGrid from '@/components/Product/ProductGrid'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners'

export default function Page() {
  const [loading, setLoading] = useState<boolean>(false)
  const [products, setProducts] = useState<IProductWithPopulatedCategories[]>()
  const searchParams = useSearchParams()

  useEffect(() => {
    const query = searchParams.get('q')

    if (query) {
      setLoading(true)

      fetch(`/api/search?q=${query}`)
        .then((response) => response.json())
        .then((data) => setProducts(data))
        .finally(() => {
          setLoading(false)
        })
    }
  }, [searchParams])

  return (
    <>
      <div className="w-11/12 mx-auto my-8">
        <h1 className="font-bold mb-6 text-3xl text-center lg:text-left border-b-2">
          Search Results
        </h1>
        {loading ? (
          <BeatLoader
            className="!flex justify-center relative top-1/4"
            size={48}
            color={'hsl(var(--pc))'}
          />
        ) : !products || products.length < 1 ? (
          <p>No results found. Please try again.</p>
        ) : (
          <>
            <ProductGrid products={products} />
          </>
        )}
      </div>
    </>
  )
}
