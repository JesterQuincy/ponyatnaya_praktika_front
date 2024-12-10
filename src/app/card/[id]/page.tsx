'use client'

import { Calendar } from '@/app/calendar/Calendar'
import { Card } from '@/app/card/Card'
import { Wrapper } from '@/components/wrapper'

export default function CardPage({ params }: { params: { id: string } }) {
  const { id } = params

  return (
    <Calendar>
      <Wrapper>
        <Card id={id} />
      </Wrapper>
    </Calendar>
  )
}
