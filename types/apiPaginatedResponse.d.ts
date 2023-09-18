interface apiPaginatedResponse<resultArrayType> {
  info: {
    currentPage: number
    totalPages: number
  }
  result: resultArrayType[]
}
