'use client'
import { useEffect, useState } from 'react'
import RiseLoader from 'react-spinners/RiseLoader'
import OrderTable from '@/components/OrderTable'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { getPaginatedData } from '@/utils/apiUtils'
import Pagination from '@/components/Pagination'

export default function Page() {
  const { data: session, status } = useSession()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(true)
  const [orderList, setOrderList] =
    useState<apiPaginatedResponse<Required<IOrder>>>()

  function getOrderList(page: number | string) {
    getPaginatedData(
      `/api/orders/${session?.user.email}`,
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
      <h1>My Orders</h1>

      {!orderList || status === 'loading' || loading ? (
        <RiseLoader className="mx-auto mt-10" color="hsl(var(--pc))" />
      ) : !orderList || orderList.result.length === 0 ? (
        <p className="indent-2.5 mt-6">No Orders to display</p>
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
