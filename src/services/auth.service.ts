import { AuthForm, AuthResponse } from '@/helpers/types/auth'
import { axiosClassic } from '@/api/interceptors'
import { removeTokenStorage, saveTokenStorage } from '@/services/auth-token.service'

export const authService = {
  async main(data: AuthForm) {
    const response = await axiosClassic.post<AuthResponse>(`/auth/sign-in`, data)
    if (response.data.access) saveTokenStorage(response.data.access, response.data.refresh)
    return response
  },

  async register(signInRequest: {
    firstName: string
    secondName: string
    lastName?: string
    username: string
    password: string
    email: string
  }) {
    const response = await axiosClassic.post('/registration/sign-up', signInRequest)

    if (response.data.access) saveTokenStorage(response.data.access, response.data.refresh)
    return response
  },

  async getNewToken(refreshToken: string) {
    const response = await axiosClassic.post<AuthResponse>('/auth/refresh', refreshToken)

    if (response.data.access) {
      saveTokenStorage(response.data.access, response.data.refresh)
    }

    return response
  },

  async logout() {
    removeTokenStorage()
  },
}
