import React from 'react'
import { Calendar } from '../calendar/Calendar'
import { Wrapper } from '@/components/wrapper'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Calendar>
      <Wrapper>{children}</Wrapper>
    </Calendar>
  )
}
