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
import { useDeleteNonWorkingDay } from '@/api/hooks/calendar/useDeleteNonWorkingDay'
import { useDeleteMeeting } from '@/api/hooks/meet/useDeleteMeeting'
import { ChangeMeetModal } from '../ChangeMeetModal/ChangeMeetModal'
import { toast } from 'react-toastify'
import { CalendarContextMenu } from './CalendarContextMenu'

type ContextMenuState = {
  x: number
  y: number
  eventId: number
  type: 'default' | 'holiday'
  visible: boolean
}

export const CalendarAdvanced = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [contextMenu, setContextMenu] = useState<ContextMenuState>({
    x: 0,
    y: 0,
    eventId: 0,
    type: 'default',
    visible: false,
  })
  const [changeModalState, setChangeModalState] = useState(false)
  const [title, setTitle] = useState('')

  const router = useRouter()

  const calRef = useRef<FullCalendar | null>(null)

  const { data: events } = useGetCalendarData(currentYear)
  const { mutateAsync: deleteMeeting } = useDeleteMeeting()
  const { mutateAsync: deleteNonWorkingDay } = useDeleteNonWorkingDay()

  const handleEventClick = (eventInfo: EventClickArg) => {
    if (eventInfo.event.display === 'background') {
      return
    }
    if (eventInfo.event.extendedProps.meetingType === 'other') {
      eventInfo.jsEvent.preventDefault()
      eventInfo.jsEvent.stopPropagation()
      return
    }

    router.push(`/meet?id=${eventInfo.event.extendedProps.id}`)
  }

  const onDeleteMeeting = async () => {
    if (!contextMenu?.eventId) return

    const toastId = toast.loading('Удаление встречи...')

    try {
      await deleteMeeting(contextMenu.eventId)

      toast.update(toastId, {
        render: 'Встреча удалена',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      })
    } catch {
      toast.update(toastId, {
        render: 'Ошибка при удалении встречи',
        type: 'error',
        isLoading: false,
        autoClose: 5000,
      })
    }
  }

  const onDeleteNonWorkingDay = async () => {
    if (!contextMenu?.eventId) return

    const toastId = toast.loading('Удаление выходного...')

    try {
      await deleteNonWorkingDay(contextMenu.eventId)

      toast.update(toastId, {
        render: 'Выходной удалён',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      })
    } catch {
      toast.update(toastId, {
        render: 'Ошибка при удалении выходного',
        type: 'error',
        isLoading: false,
        autoClose: 5000,
      })
    }
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
          scrollTimeReset={false}
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
          eventDidMount={(eventInfo) => {
            const el = eventInfo.el as HTMLElement
            if (!el.dataset._ctxAttached) {
              el.dataset._ctxAttached = '1'

              const onContext = (e: MouseEvent) => {
                e.preventDefault()
                e.stopPropagation()
                setContextMenu({
                  x: (e as MouseEvent).clientX,
                  y: (e as MouseEvent).clientY,
                  eventId: eventInfo.event.extendedProps.id,
                  type: eventInfo.event.allDay ? 'holiday' : 'default',
                  visible: true,
                })
              }

              el.addEventListener('contextmenu', onContext)
            }
          }}
        />
      </TooltipProvider>
      <CalendarContextMenu
        contextMenu={contextMenu}
        onClose={() =>
          setContextMenu((prev) => {
            return { ...prev, visible: false }
          })
        }
        onDeleteMeeting={onDeleteMeeting}
        onDeleteNonWorkingDay={onDeleteNonWorkingDay}
        onChangeMeeting={() => setChangeModalState(true)}
      />
      {changeModalState && (
        <ChangeMeetModal
          meetId={contextMenu?.eventId ?? 0}
          isOpen={changeModalState}
          onClose={() => setChangeModalState(false)}
        />
      )}
    </div>
  )
}
