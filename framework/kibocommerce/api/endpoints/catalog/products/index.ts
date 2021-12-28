import { GetAPISchema, createEndpoint } from '@commerce/api'
import productsEndpoint from '@commerce/api/endpoints/catalog/products'
import type { KiboCommerceAPI } from '../../..'
import getProducts from '../products/products'

export type ProductsAPI = GetAPISchema<KiboCommerceAPI, any>

export type ProductsEndpoint = ProductsAPI['endpoint']

export const handlers: ProductsEndpoint['handlers'] = { getProducts }

const productsApi = createEndpoint<ProductsAPI>({
  handler: productsEndpoint,
  handlers,
})

export default productsApi
