'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'
import ProductForm from '@/components/Product/ProductForm'
import RiseLoader from 'react-spinners/RiseLoader'

export default function Page({
  params,
}: {
  params: {
    productId: string
  }
}) {
  const [product, setProduct] = useState<IProduct | undefined>(),
    router: AppRouterInstance = useRouter()

  useEffect(() => {
    if (!params.productId) {
      toast.error('Invalid Product Specified')
      router.push('/admin/products')
    }

    fetch(`/api/products/${params.productId}`)
      .then((response) => response.json())
      .then((data: IProduct | undefined) => {
        if (!data) {
          toast.error('Invalid Product Specified')
          router.push('/admin/products')
        }
        setProduct(data)
      })
  }, [params.productId, router])

  return (
    <>
      <h1 className="mb-6">Edit Product</h1>

      {!product ? (
        <RiseLoader
          className="absolute top-1/3 left-1/2"
          color="hsl(var(--p))"
        />
      ) : (
        <ProductForm existingProduct={product} />
      )}
    </>
  )
}
