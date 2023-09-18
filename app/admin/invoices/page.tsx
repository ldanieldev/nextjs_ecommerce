'use client'
import OrderTable from '@/components/OrderTable'
import Pagination from '@/components/Pagination'
import { getPaginatedData } from '@/utils/apiUtils'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import RiseLoader from 'react-spinners/RiseLoader'

export default function Page() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState<boolean>(true)
  const [orderList, setOrderList] =
    useState<apiPaginatedResponse<Required<IOrder>>>()

  function getOrderList(page: number | string) {
    getPaginatedData(
      '/api/orders',
      page,
      setLoading,
      setOrderList,
      router,
      window.location.pathname
    )
  }

  useEffect(() => {
    const page = searchParams.get('page') ?? '1'
    getOrderList(page)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  return (
    <>
      <h1>Invoices</h1>

      {!orderList || loading || status === 'loading' ? (
        <RiseLoader
          className="!flex justify-center relative top-1/4"
          size={48}
          color={'hsl(var(--pc))'}
        />
      ) : (
        <>
          <OrderTable orders={orderList.result} />

          <Pagination
            currentPage={orderList.info.currentPage}
            totalPages={orderList.info.totalPages}
            onPreviousPageClick={() =>
              getOrderList(orderList.info.currentPage - 1)
            }
            onNextPageClick={() => getOrderList(orderList.info.currentPage + 1)}
          />
        </>
      )}
    </>
  )
}
