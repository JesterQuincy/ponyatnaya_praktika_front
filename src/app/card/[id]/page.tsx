'use client'

import { Calendar } from '@/app/calendar/Calendar'
import { Card } from '@/app/card/Card'

export default function CardPage({ params }: { params: { id: string } }) {
  const { id } = params

  return (
    <Calendar>
      <Card id={id} />
    </Calendar>
  )
}
