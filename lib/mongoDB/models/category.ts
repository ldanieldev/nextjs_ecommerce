import mongoose, {
  InferSchemaType,
  Model,
  model,
  models,
  Schema,
} from 'mongoose'

const schema = new Schema({
  name: { type: String, required: true },
  parent: { type: mongoose.Types.ObjectId, ref: 'Category' },
  properties: [{ type: Object }],
})

export type Category = InferSchemaType<typeof schema>

const Category: Model<Category> = models.Category || model('Category', schema)

export default Category
