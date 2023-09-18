/******************************************
 * DaiseyUI Model
 *
 * requires label with a matching htmlFor
 * attribute with the same modal id to act
 * as the modal opener
 *
 * ****************************************/

type props = {
  action: string
  item: string
  confirmHandler: () => void
  declineHandler?: () => void
  modalId?: string
  confirmBtnText?: string
  declineBtnText?: string
}

export default function ConfirmationModal({
  action,
  item,
  confirmHandler,
  declineHandler = () => void 0,
  modalId = 'confirmationModal',
  confirmBtnText = 'Yes',
  declineBtnText = 'No',
}: props) {
  return (
    <div>
      <input type="checkbox" id={modalId} className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg capitalize">
            {action + ' ' + item}
          </h3>
          <p className="py-4">
            Are you sure you would like to {action + ' ' + item}?
          </p>
          <div className="modal-action">
            <label
              htmlFor={modalId}
              className="btn btn-success"
              onClick={confirmHandler}
            >
              {confirmBtnText}
            </label>
            <label
              htmlFor={modalId}
              className="btn btn-error"
              onClick={declineHandler}
            >
              {declineBtnText}
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
