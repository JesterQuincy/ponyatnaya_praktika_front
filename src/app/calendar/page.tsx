'use client'

import { Calendar } from '@/app/calendar/Calendar'
import { CalendarAdvanced } from '@/components/ui/calendar/CalendarAdvanced'

export default function CalendarPage() {
  return (
    <Calendar>
      <CalendarAdvanced />
    </Calendar>
  )
}
