import { api } from '../client'

export const authService = {
  signIn: async (code: string) => {
    const response = await api.post('/auth/signin', { code })
    return response.data
  }
}