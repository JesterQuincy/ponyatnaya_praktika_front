'use client'

import { Calendar } from '@/app/calendar/Calendar'
import { Meet } from '@/app/meet/Meet'
import { Wrapper } from '@/components/wrapper'

export default function MeetPage() {
  return (
    <Calendar>
      <Wrapper>
        <Meet />
      </Wrapper>
    </Calendar>
  )
}
