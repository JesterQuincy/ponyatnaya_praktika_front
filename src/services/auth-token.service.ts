import Cookies from 'js-cookie'

const DOMAIN = process.env.NEXT_PUBLIC_COOKIE_DOMAIN

export enum EnumTokens {
  'ACCESS_TOKEN' = 'accessToken',
  'REFRESH_TOKEN' = 'refreshToken',
}

export const getTokens = () => {
  const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN)
  const refreshToken = Cookies.get(EnumTokens.REFRESH_TOKEN)

  return {
    accessToken: accessToken || null,
    refreshToken: refreshToken || null,
  }
}

export const saveTokenStorage = (accessToken: string, refreshToken: string) => {
  Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
    domain: DOMAIN,
    sameSite: 'strict',
    expires: 1,
  })

  Cookies.set(EnumTokens.REFRESH_TOKEN, refreshToken, {
    domain: DOMAIN,
    sameSite: 'strict',
    expires: 7,
  })
}

export const removeTokenStorage = () => {
  Cookies.remove(EnumTokens.ACCESS_TOKEN, { domain: DOMAIN })
  Cookies.remove(EnumTokens.REFRESH_TOKEN, { domain: DOMAIN })
}
