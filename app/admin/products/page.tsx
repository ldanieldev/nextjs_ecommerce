'use client'
import Link from 'next/link'
import { MdAdd } from 'react-icons/md'
import ProductTable from '@/components/Product/ProductTable'
import { useEffect, useState } from 'react'
import RiseLoader from 'react-spinners/RiseLoader'
import Pagination from '@/components/Pagination'
import { useRouter, useSearchParams } from 'next/navigation'
import { getPaginatedData } from '@/utils/apiUtils'

export default function Page() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(true)
  const [productList, setProductList] =
    useState<apiPaginatedResponse<IProduct>>()

  function getProductList(page: number | string = 1) {
    getPaginatedData(
      '/api/products',
      page,
      setLoading,
      setProductList,
      router,
      window.location.pathname
    )
  }

  useEffect(() => {
    const page = searchParams.get('page') ?? 1
    getProductList(page)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div>
        <Link href="/admin/products/add" className="btn btn-primary">
          <MdAdd className="inline-block mr-2" size={18} />
          New Product
        </Link>
      </div>

      <div className="mt-6">
        {loading || !productList ? (
          <RiseLoader
            className="!flex justify-center relative top-1/4"
            size={48}
            color={'hsl(var(--pc))'}
          />
        ) : (
          <>
            <ProductTable
              productList={productList.result}
              refreshList={getProductList}
            />
            <Pagination
              currentPage={productList.info.currentPage}
              totalPages={productList.info.totalPages}
              onPreviousPageClick={() =>
                getProductList(productList.info.currentPage - 1)
              }
              onNextPageClick={() =>
                getProductList(productList.info.currentPage + 1)
              }
            />
          </>
        )}
      </div>
    </>
  )
}
