'use client'

import { Calendar } from '@/app/calendar/Calendar'
import { Wrapper } from '@/components/wrapper'

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <Calendar>
      <Wrapper>{children}</Wrapper>
    </Calendar>
  )
}
