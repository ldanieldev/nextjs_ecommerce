type ICategoryProperty = {
  name: string
  values: string[]
}

type ICategory = {
  _id: string
  name: string
  parent?: ICategory
  properties: ICategoryProperty[]
}
