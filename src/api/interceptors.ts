import axios, { CreateAxiosDefaults } from 'axios'
import { getTokens, removeTokenStorage } from '@/services/auth-token.service'
import { authService } from '@/services/auth.service'

const options: CreateAxiosDefaults = {
  baseURL: 'http://195.151.1.151:3330/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
}
const axiosClassic = axios.create(options)

const axiosWithAuth = axios.create(options)

axiosWithAuth.interceptors.request.use((config) => {
  const { accessToken } = getTokens()

  if (config?.headers && accessToken) config.headers.Authorization = `Bearer ${accessToken}`
  return config
})

axiosWithAuth.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config

    if (error?.response?.status === 401 && !originalRequest._isRetry) {
      originalRequest._isRetry = true
      try {
        const { refreshToken } = getTokens()

        if (!refreshToken) {
          removeTokenStorage()
          throw error
        }

        await authService.getNewToken(refreshToken)

        return axiosWithAuth.request(originalRequest)
      } catch (err) {
        removeTokenStorage()
      }
    }
    throw error
  },
)

export { axiosClassic, axiosWithAuth }
//
// axiosWithAuth.interceptors.response.use(
//     (config) => config,
//     async (error) => {
//       const originalRequest = error.config
//
//       if (error?.response?.status === 401 && !originalRequest._isRetry) {
//         originalRequest._isRetry = true
//         try {
//           const { refreshToken } = getTokens()
//
//           if (!refreshToken) {
//             removeTokenStorage()
//             throw error
//           }
//
//           await authService.getNewToken(refreshToken)
//
//           return axiosWithAuth.request(originalRequest)
//         } catch (err) {
//           removeTokenStorage()
//         }
//       }
//       throw error
//     },
// )
//
// export { axiosClassic, axiosWithAuth }
