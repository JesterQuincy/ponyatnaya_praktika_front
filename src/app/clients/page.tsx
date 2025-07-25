'use client'

import { Calendar } from '@/app/calendar/Calendar'
import { Clients } from '@/components/ui/clients/Clients'
import { Wrapper } from '@/components/wrapper'

export default function Client() {
  return (
    <Calendar>
      <Wrapper>
        <Clients />
      </Wrapper>
    </Calendar>
  )
}
