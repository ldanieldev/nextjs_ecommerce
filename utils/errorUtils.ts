export function getErrorMessage (error: Error | unknown) {
  return error instanceof Error
    ? error.message
    : 'An unexpected error occurred. Please try again later.'
}
