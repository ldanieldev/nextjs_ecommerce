'use client'
import React from 'react'
import { ToastContainer } from 'react-toastify'

export default function GlobalToastContainer() {
  return (
    <ToastContainer
      position="bottom-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  )
}
