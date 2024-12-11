'use client'

import { Calendar } from '@/app/calendar/Calendar'
import { MeetWithSuspense } from '@/app/meet/Meet'
import { Wrapper } from '@/components/wrapper'

export default function MeetPage() {
  return (
    <Calendar>
      <Wrapper>
        <MeetWithSuspense />
      </Wrapper>
    </Calendar>
  )
}
