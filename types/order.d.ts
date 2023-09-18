interface ILineItem {
  quantity: number
  price_data: {
    currency: 'USD'
    product_data: {
      name: string
      metadata: { id: string }
    }
    unit_amount: number
  }
}

interface IOrder {
  _id?: string
  name: string
  email: string
  address: string
  city: string
  state: string
  zipCode: string
  paid: boolean
  lineItems: ILineItem[]
  createdAt?: string
  updatedAt?: string
}
