'use client'

import styles from '@/styles/calendarbody.module.css'
import FullCalendar from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import ruLocale from '@fullcalendar/core/locales/ru'
import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useGetCalendarData } from '@/api/hooks/calendar/useGetCalendarData'
import { EventClickArg } from '@fullcalendar/core'
import { Toolbar } from './Toolbar'
import { renderEventContent } from './renderEventContent'
import { TooltipProvider } from '@/components/ui/tooltip'

export const CalendarTwo = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [title, setTitle] = useState('')

  const router = useRouter()

  const calRef = useRef<FullCalendar | null>(null)

  const { data: events } = useGetCalendarData(currentYear)

  const handleEventClick = (eventInfo: EventClickArg) => {
    if (eventInfo.event.display === 'background') {
      return
    }

    router.push(`/meet?id=${eventInfo.event.extendedProps.id}`)
  }

  return (
    <div className={styles.MainContainer}>
      <Toolbar calRef={calRef} title={title} />

      <TooltipProvider delayDuration={300} skipDelayDuration={0}>
        <FullCalendar
          slotLabelFormat={{ hour: '2-digit', minute: '2-digit', hour12: false }}
          headerToolbar={false}
          ref={calRef}
          eventClick={handleEventClick}
          events={events}
          firstDay={1}
          nowIndicator
          stickyHeaderDates
          timeZone="local"
          initialView="dayGridMonth"
          allDaySlot={false}
          locale="ru"
          locales={[ruLocale]}
          plugins={[timeGridPlugin, interactionPlugin, dayGridPlugin]}
          scrollTime="08:00:00"
          slotDuration="00:30:00"
          snapDuration="00:30:00"
          datesSet={(dateInfo) => {
            setTitle(dateInfo.view.title)

            const newYear = dateInfo.view.currentStart.getFullYear()
            if (newYear !== currentYear) {
              setCurrentYear(newYear)
            }
          }}
          views={{
            dayGridMonth: {
              eventDisplay: 'list-item',
              eventTimeFormat: { hour: '2-digit', minute: '2-digit', hour12: false },
              fixedWeekCount: false,
            },
          }}
          dayMaxEventRows={4}
          eventContent={renderEventContent}
          eventClassNames={(arg) => {
            const isMonth = arg.view.type.startsWith('dayGrid')
            if (isMonth) return ''

            if (arg.event.extendedProps.formatMeet === 'Онлайн') return styles.eventOnline
            if (arg.event.extendedProps.formatMeet === 'Оффлайн') return styles.eventOffline

            return ''
          }}
        />
      </TooltipProvider>
    </div>
  )
}
