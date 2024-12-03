import type { Metadata } from 'next'
import { Login } from './Login'

export const metadata: Metadata = {
  title: 'Авторизация',
}

export default function AuthPage() {
  return <Login />
}
