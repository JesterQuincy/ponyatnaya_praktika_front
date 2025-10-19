import { useQuery } from '@tanstack/react-query'
import { calendarService } from '@/services/calendar.service'
import { EInvalidationTags } from '@/api/hooks/constants'
import { toast } from 'react-toastify'

export const useGetCalendarData = (year: number) => {
  const query = useQuery({
    queryKey: [EInvalidationTags.CALENDAR],
    queryFn: () => calendarService.getCalendarData(year).then((res) => res.data),
    enabled: !!year,
    select: (data) => {
      const nonWorkingDays =
        data.nonWorkingDays?.map((day) => ({
          title: day.title,
          start: day.date,
          end: day.date,
          allDay: true,
          display: 'background',
          color: '#e0e0e0',
          editable: false,
          interaction: false,
          className: 'pointer-none',
          extendedProps: {
            id: day.id,
          },
        })) || []

      const formattedMeetings =
        data.clientsData?.flatMap((client) =>
          client.meetings.map((meeting) => ({
            title: client.fullName || meeting.title,
            start: meeting.startTime,
            end: meeting.endTime,
            allDay: false,
            extendedProps: {
              meetingType: !client.fullName ? 'other' : 'client',
              formatMeet: meeting.formatMeet,
              id: meeting.id,
            },
          })),
        ) || []

      return [...formattedMeetings, ...nonWorkingDays]
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  })

  if (query.isError) {
    toast.error('Произошла ошибка')
  }

  return query
}
