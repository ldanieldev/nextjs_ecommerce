'use client'
import ProductGrid from '@/components/Product/ProductGrid'
import Pagination from '@/components/Pagination'
import { useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners'
import { useRouter, useSearchParams } from 'next/navigation'
import { getPaginatedData } from '@/utils/apiUtils'

export default function Page() {
  const searchParams = useSearchParams()
  const router = useRouter()

  function getData(page: number | string) {
    getPaginatedData(
      '/api/products',
      page,
      setLoading,
      setProducts,
      router,
      window.location.pathname
    )
  }

  const [loading, setLoading] = useState<boolean>(false)
  const [products, setProducts] =
    useState<apiPaginatedResponse<IProductWithPopulatedCategories>>()
  const page = searchParams.get('page') ?? 1

  useEffect(() => {
    getData(page)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="w-11/12 mx-auto my-8">
        <h1 className="font-bold mb-6 text-3xl text-center lg:text-left border-b-2">
          All Products
        </h1>
        {!products || loading ? (
          <BeatLoader
            className="!flex justify-center relative top-1/4"
            size={48}
            color={'hsl(var(--pc))'}
          />
        ) : (
          <>
            <ProductGrid products={products.result} />

            <Pagination
              currentPage={products.info.currentPage}
              totalPages={products.info.totalPages}
              onPreviousPageClick={() => getData(products.info.currentPage - 1)}
              onNextPageClick={() => getData(products.info.currentPage + 1)}
            />
          </>
        )}
      </div>
    </>
  )
}
