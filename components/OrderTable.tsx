import { toDisplayDateTime, toDisplayPrice } from '@/utils/stringUtils'

type props = {
  orders: {
    _id: string
    name: string
    email: string
    address: string
    city: string
    state: string
    zipCode: string
    paid: boolean
    lineItems: {
      quantity: number
      price_data: {
        product_data: { name: string }
        unit_amount: number
      }
    }[]
    createdAt: string
  }[]
}

export default function OrderTable({ orders }: props) {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table table-zebra mt-6 w-full">
          <thead>
            <tr>
              <th>Date</th>
              <th>Paid</th>
              <th>Recipient</th>
              <th>Products</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="whitespace-pre-line">
                  {toDisplayDateTime(new Date(order.createdAt))}
                </td>
                <td className={order.paid ? 'text-success' : 'text-error'}>
                  {order.paid ? 'Yes' : 'No'}
                </td>
                <td>
                  {order.name}
                  <br />
                  {order.email}
                  <br />
                  {order.address}
                  <br />
                  {order.city}, {order.state}
                  <br />
                  {order.zipCode}
                </td>
                <td className="whitespace-pre-line">
                  {order.lineItems.map((item, index) => (
                    <span key={index}>
                      {item.price_data.product_data.name} x {item.quantity}
                      <br />
                    </span>
                  ))}
                </td>
                <td>
                  {toDisplayPrice(
                    order.lineItems.reduce(
                      (accumulator, currentItem) =>
                        accumulator +
                        currentItem.quantity *
                          currentItem.price_data.unit_amount,
                      0
                    ) / 100
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
