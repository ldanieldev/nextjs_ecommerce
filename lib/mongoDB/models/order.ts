import { InferSchemaType, Model, Schema, model, models } from 'mongoose'

const schema = new Schema(
  {
    lineItems: Object,
    name: String,
    email: String,
    address: String,
    city: String,
    state: String,
    zipCode: String,
    paid: Boolean,
  },
  { timestamps: true }
)

type Order = InferSchemaType<typeof schema>

const Order: Model<Order> = models.Order || model('Order', schema)

export default Order
