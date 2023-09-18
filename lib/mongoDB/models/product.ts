import { InferSchemaType, Model, model, models, Schema } from 'mongoose'

const schema = new Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    images: [{ type: String }],
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    properties: { type: Object },
    countInStock: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
)

schema.index({ '$**': 'text' })

type Product = InferSchemaType<typeof schema>

const Product: Model<Product> = models.Product || model('Product', schema)

export default Product
