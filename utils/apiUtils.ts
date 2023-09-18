import { Dispatch, SetStateAction } from 'react'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'

export function paginateResponse(
  resultArray: unknown[],
  currentPage: number,
  itemsPerPage = 9
) {
  const totalItems = resultArray.length,
    start = (currentPage - 1) * itemsPerPage

  let totalPages = Math.floor(totalItems / itemsPerPage)
  totalPages += totalItems % itemsPerPage > 0 ? 1 : 0

  let end = start + itemsPerPage

  if (end > totalItems) {
    end = totalItems
  }

  return {
    info: {
      currentPage,
      totalPages,
    },
    result: resultArray.slice(start, end),
  }
}

export function getPaginatedData(
  apiUrl: string,
  page: number | string = 1,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setData: Dispatch<SetStateAction<any>>,
  router: AppRouterInstance,
  pageUrl: string
) {
  setLoading(true)

  fetch(`${apiUrl}?page=${page}`)
    .then((response) => response.json())
    .then((data) => {
      setData(data)
    })
    .finally(() => {
      setLoading(false)
      router.push(`${pageUrl}?page=${page ?? 1}`)
    })
}
