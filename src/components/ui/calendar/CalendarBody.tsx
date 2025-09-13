'use client'

import styles from '@/styles/calendarbody.module.css'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import multiMonthPlugin from '@fullcalendar/multimonth'
import moment from 'moment'
import 'moment/locale/ru'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { EventClickArg } from '@fullcalendar/core'
import { useGetCalendarData } from '@/api/hooks/calendar/useGetCalendarData'
import CustomContextMenu from '../context-menu'
import { useDeleteMeeting } from '@/api/hooks/meet/useDeleteMeeting'
import { ChangeMeetModal } from '../ChangeMeetModal/ChangeMeetModal'
import { useDeleteNonWorkingDay } from '@/api/hooks/calendar/useDeleteNonWorkingDay'

moment.locale('ru')

type ContextMenuState = {
  x: number
  y: number
  event: any
  type: 'default' | 'holiday'
} | null

export default function CalendarBody() {
  const [viewType, setViewType] = useState('')
  const [currentId, setCurrentId] = useState<number | null>(null)
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [contextMenu, setContextMenu] = useState<ContextMenuState>(null)
  const [changeModalState, setChangeModalState] = useState(false)
  const router = useRouter()

  const { data: events } = useGetCalendarData(currentYear)
  const { mutate: deleteMeeting } = useDeleteMeeting()
  const { mutate: deleteNonWorkingDay } = useDeleteNonWorkingDay()

  const handleEventClick = (eventInfo: EventClickArg) => {
    if (eventInfo.event.display === 'background') {
      return
    }
    router.push(`/meet?id=${eventInfo.event.extendedProps?.id ?? eventInfo.event.id}`)
  }

  const calendarWrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timeout = setTimeout(() => {
      const todayCell = calendarWrapperRef.current?.querySelector(
        '[data-date="' + moment().format('YYYY-MM-DD') + '"]',
      ) as HTMLElement | null

      if (todayCell) {
        todayCell.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }, 500)

    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (contextMenu) {
        setContextMenu(null)
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [contextMenu])

  const onClose = () => {
    setChangeModalState(false)
  }

  return (
    <div className={styles.MainContainer} ref={calendarWrapperRef}>
      <FullCalendar
        initialView="multiMonthYear"
        initialDate={new Date(currentYear, 0, 1)}
        eventDidMount={(eventInfo) => {
          if (eventInfo.event.display === 'background') {
            eventInfo.el.style.cursor = 'default'
            if (!eventInfo.event.allDay) {
              eventInfo.el.style.pointerEvents = 'none'
            } else {
              eventInfo.el.style.pointerEvents = 'auto'
            }
          } else {
            eventInfo.el.style.cursor = 'pointer'
            eventInfo.el.style.pointerEvents = 'auto'
          }

          const el = eventInfo.el as HTMLElement
          if (!el.dataset._ctxAttached) {
            el.dataset._ctxAttached = '1'

            const onContext = (e: MouseEvent) => {
              e.preventDefault()
              e.stopPropagation()

              const id =
                (eventInfo.event.extendedProps && (eventInfo.event.extendedProps as any).id) ?? eventInfo.event.id
              console.log('contextmenu on event', {
                id,
                allDay: eventInfo.event.allDay,
                display: eventInfo.event.display,
              })

              setCurrentId(Number(id))
              setContextMenu({
                x: (e as MouseEvent).clientX,
                y: (e as MouseEvent).clientY,
                event: eventInfo.event,
                type: eventInfo.event.allDay ? 'holiday' : 'default',
              })
            }

            el.addEventListener('contextmenu', onContext)
          }
        }}
        datesSet={(dateInfo) => {
          const newYear = dateInfo.view.currentStart.getFullYear()

          if (newYear !== currentYear) {
            setCurrentYear(newYear)
          }
        }}
        plugins={[timeGridPlugin, interactionPlugin, multiMonthPlugin]}
        headerToolbar={{
          start: 'prev,today,next',
          right: 'timeGridDay,timeGridWeek,multiMonthYear',
          center: 'title',
        }}
        fixedWeekCount={true}
        slotMinTime="00:00:00"
        slotMaxTime="24:00:00"
        slotDuration="00:30:00"
        locale="ru"
        titleFormat={{ year: 'numeric', month: 'long' }}
        buttonText={{
          today: 'Сегодня',
          day: 'День',
          month: 'Месяц',
          week: 'Неделя',
          year: 'Месяц',
          multiMonthYear: 'Год',
        }}
        slotLabelFormat={{
          hour: '2-digit',
          minute: '2-digit',
        }}
        nowIndicator={true}
        dayHeaderContent={(dateInfo) => {
          const isToday = moment(dateInfo.date).isSame(moment(), 'day')
          const dayName =
            moment(dateInfo.date).format('dd').charAt(0).toUpperCase() + moment(dateInfo.date).format('dd').slice(1)
          if (viewType === 'timeGridWeek') {
            return (
              <div className="flex items-center gap-[5px]">
                <span className="font-semibold">{dayName},</span>
                {isToday ? (
                  <span className="flex items-center justify-center w-6 h-6 text-white bg-[#EA660C] rounded-full">
                    {moment(dateInfo.date).format('D')}
                  </span>
                ) : (
                  <span className="font-semibold">{moment(dateInfo.date).format('D')}</span>
                )}
              </div>
            )
          }

          return <></>
        }}
        viewDidMount={(info) => setViewType(info.view.type)}
        events={events}
        eventContent={(eventInfo) => {
          const { formatMeet } = eventInfo.event.extendedProps
          let bgColor = 'bg-[#52525233]'
          let badgeColor = 'bg-[#6E6E6E]'
          let badgeText = 'Другое'

          if (formatMeet === 'Онлайн') {
            bgColor = 'bg-[#86DAFF4D]'
            badgeColor = 'bg-[#049ADB]'
            badgeText = 'Онлайн'
          } else if (formatMeet === 'Офлайн') {
            bgColor = 'bg-[#EA660C33]'
            badgeColor = 'bg-[#EA660C]'
            badgeText = 'Офлайн'
          }
          if (viewType === 'timeGridWeek' || viewType === 'timeGridDay') {
            return (
              <div className={`w-full h-full p-2 flex flex-col gap-[10px] ${bgColor}`}>
                <div className="flex items-center gap-[5px] w-full">
                  <span className={`px-2 text-xs font-medium rounded ${badgeColor} text-white`}>{badgeText}</span>
                </div>
                <div className="mt-1 text-sm font-semibold text-black truncate">{eventInfo.event.title}</div>
              </div>
            )
          }

          return !(eventInfo.event.display === 'background') ? (
            <div
              className={`${bgColor} text-[#272727] px-2 py-1 w-full h-full max-w-full truncate flex justify-between items-center`}>
              <span className="text-sm font-normal truncate">{eventInfo.event.title}</span>
              <span className="text-xs text-[#6A6A6A] ml-2">{moment(eventInfo.event.start).format('HH:mm')}</span>
            </div>
          ) : (
            <span className="text-sm font-normal">{eventInfo.event.title}</span>
          )
        }}
        eventClassNames="w-full h-full"
        eventClick={(event) => {
          handleEventClick(event)
        }}
        views={{
          multiMonthYear: {
            type: 'multiMonth',
            duration: { months: 12 },
            multiMonthMaxColumns: 1,
            multiMonthMinWidth: 300,
            showNonCurrentDates: true,
            firstDay: 1,
            fixedWeekCount: false,
            dayHeaders: true,
            dayHeaderFormat: { weekday: 'short' },
          },
        }}
      />

      {contextMenu && contextMenu.type === 'default' && (
        <CustomContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          items={[
            { label: 'Изменить встречу', onClick: () => setChangeModalState(true) },
            { label: 'Удалить встречу', onClick: () => currentId && deleteMeeting(currentId) },
          ]}
        />
      )}

      {contextMenu && contextMenu.type === 'holiday' && (
        <CustomContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          items={[{ label: 'Удалить выходной', onClick: () => currentId && deleteNonWorkingDay(currentId) }]}
        />
      )}

      {changeModalState && <ChangeMeetModal meetId={currentId ?? 0} isOpen={changeModalState} onClose={onClose} />}
    </div>
  )
}
