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
    lastName: string
    name: string
    patronymic?: string
    username: string
    email: string
    password: string
  }) {
    const response = await axiosClassic.put('/registration/sign-up', null, {
      params: signInRequest,
    })

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
