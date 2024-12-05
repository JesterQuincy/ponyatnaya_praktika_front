'use client'

import styles from '@/styles/calendarbody.module.css'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { calendarService } from '@/services/calendar.service'
import moment from 'moment'
import 'moment/locale/ru'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

moment.locale('kz')

export default function CalendarBody() {
  const [events, setEvents] = useState<any[]>([])
  const [viewType, setViewType] = useState('')
  const router = useRouter()

  const generateEvents = (serverData: { clientsData: any[] }) => {
    return serverData.clientsData.flatMap((client) =>
      client.meetings.map((meeting: { startTime: moment.MomentInput; endTime: any; formatMeet: any }) => ({
        title: `${client.fullName} - ${moment(meeting.startTime).format('HH:mm')}`,
        start: meeting.startTime,
        end: meeting.endTime,
        allDay: false,
        extendedProps: {
          formatMeet: meeting.formatMeet,
        },
      })),
    )
  }

  const fetchData = async () => {
    try {
      const serverData = await calendarService.getCalendarData(2024)
      const generatedEvents = generateEvents(serverData.data)

      setEvents([...generatedEvents])
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleEventClick = () => {
    router.push('/meet')
  }

  return (
    <div className={styles.MainContainer}>
      <div>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'title',
            center: 'timeGridDay,timeGridWeek,dayGridYear',
            right: 'prev,today,next',
          }}
          initialView="dayGridYear"
          initialDate={new Date()}
          fixedWeekCount={true}
          slotMinTime="00:00:00"
          slotMaxTime="24:00:00"
          slotDuration="00:30:00"
          locale="kz"
          titleFormat={{ year: 'numeric', month: 'long' }}
          buttonText={{
            today: 'Сегодня',
            day: 'День',
            month: 'Месяц',
            week: 'Неделя',
            year: 'Месяц',
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

            if (formatMeet === 'online') {
              bgColor = 'bg-[#86DAFF4D]'
              badgeColor = 'bg-[#049ADB]'
              badgeText = 'Онлайн'
            } else if (formatMeet === 'offline') {
              bgColor = 'bg-[#EA660C33]'
              badgeColor = 'bg-[#EA660C]'
              badgeText = 'Офлайн'
            }
            if (viewType === 'timeGridWeek' || viewType === 'timeGridDay') {
              return (
                <div className={`w-full h-full p-2 flex flex-col gap-[10px] ${bgColor}`}>
                  <div className="flex justifty-start items-center gap-[5px] w-full">
                    <span className="text-xs text-gray-600 text-black">
                      {moment(eventInfo.event.start).format('HH:mm')}
                    </span>
                    <span className={`px-2 text-xs font-medium rounded ${badgeColor} text-white`}>{badgeText}</span>
                  </div>
                  <div className="mt-1 text-sm font-semibold text-black truncate">{eventInfo.event.title}</div>
                </div>
              )
            }

            return (
              <div
                className={`${bgColor} text-[#272727] px-2 py-1 w-full h-full max-w-full truncate flex justify-between items-center`}>
                <span className="text-sm font-normal truncate">{eventInfo.event.title}</span>
                <span className="text-xs text-[#6A6A6A] ml-2">{moment(eventInfo.event.start).format('HH:mm')}</span>
              </div>
            )
          }}
          eventClassNames="w-full h-full hover:cursor-pointer"
          eventClick={handleEventClick}
        />
      </div>
    </div>
  )
}
