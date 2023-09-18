import { Id, toast, TypeOptions } from 'react-toastify'
export function updateToast (
  toastId: Id,
  message: string,
  type: TypeOptions,
  isLoading = false
): void  {
  toast.update(toastId, {
    render: message,
    type: type,
    isLoading: isLoading,
    autoClose: 3000,
    closeOnClick: true,
  })
}

