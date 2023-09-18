type ProductProperty = {
  [propertyName: string]: string
}

interface IProduct {
  _id: string
  name: string
  images: string[]
  description: string
  brand: string
  price: number
  countInStock: number
  featured: boolean
  category?: string
  properties: ProductProperty
}

interface IProductWithPopulatedCategories extends IProduct {
  category?: {
    _id: string
    name: string
    parent?: {
      _id: string
      name: string
    }
  }
}
