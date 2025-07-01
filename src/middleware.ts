import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const publicRoutes = ['/login', '/registration', '/questionnaire', '/poll', '/']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('accessToken')?.value // Предположим, что токен хранится в куках

  if (!publicRoutes.includes(pathname) && !token) {
    return NextResponse.redirect(new URL('/login', request.url)) // Перенаправляем на страницу входа
  }

  if (publicRoutes.includes(pathname) && token) {
    return NextResponse.redirect(new URL('/calendar', request.url)) // Перенаправляем на приватную страницу
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
}
