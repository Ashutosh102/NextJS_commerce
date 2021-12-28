import { MutationHook } from '@commerce/utils/types'
import useLogin, { UseLogin } from '@commerce/auth/use-login'

import { useCallback } from 'react'
import { CommerceError } from '@commerce/utils/errors'
import type { LoginHook } from '../types/login'
import useCustomer from '../customer/use-customer'
import useCart from '../cart/use-cart'
export default useLogin as UseLogin<typeof handler>

export const handler: MutationHook<LoginHook> = {
  fetchOptions: {
    url: '/api/login',
    method: 'POST'
  },
  async fetcher({ input: { email, password }, options, fetch }) {
    if (!(email && password)) {
      throw new CommerceError({
        message:
          'An email and password are required to login',
      })
    }

    return fetch({
      ...options,
      body: { email, password },
    })
  },
  useHook: ({ fetch }) => () => {
    const { revalidate } = useCustomer()
    const {revalidate: revalidateCart} = useCart()
    return useCallback(
      async function login(input) {
        const data = await fetch({ input })
        await revalidate()
        await revalidateCart()
        return data
      },
      [fetch, revalidate, revalidateCart]
    )
  },
}
