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
      return data.clientsData.flatMap((client) =>
        client.meetings.map((meeting) => ({
          title: `${client.fullName || meeting.title}`,
          start: meeting.startTime,
          end: meeting.endTime,
          allDay: false,
          extendedProps: {
            formatMeet: meeting.formatMeet,
            id: meeting.id,
          },
        })),
      )
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  })

  if (query.isError) {
    toast.error('Произошла ошибка')
  }

  return query
}
