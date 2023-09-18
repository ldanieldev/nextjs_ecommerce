type props = {
  currentPage: number
  totalPages: number
  onPreviousPageClick: () => void
  onNextPageClick: () => void
}
export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPreviousPageClick,
  onNextPageClick,
}: props) {
  if (totalPages < 2) return <></>

  return (
    <>
      <div className="btn-group mt-6 justify-center w-full">
        <button
          onClick={onPreviousPageClick}
          className={`btn btn-primary ${currentPage === 1 && 'btn-disabled'}`}
        >
          «
        </button>
        <button className="btn btn-primary">
          Page {currentPage}/{totalPages}
        </button>
        <button
          onClick={onNextPageClick}
          className={`btn btn-primary ${
            currentPage === totalPages && 'btn-disabled'
          }`}
        >
          »
        </button>
      </div>
    </>
  )
}
