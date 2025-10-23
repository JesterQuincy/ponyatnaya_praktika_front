import { useQuery } from '@tanstack/react-query'
import { EInvalidationTags } from '@/api/hooks/constants'
import { calendarService } from '@/services/calendar.service'
import { toast } from 'react-toastify'

export const useGetNotifications = () => {
  const query = useQuery({
    queryKey: [EInvalidationTags.NOTIFICATIONS],
    queryFn: () => calendarService.getNotifications().then((res) => res.data),
    select: (data) =>
      data.notificationResponseList
        ?.sort((a, b) => new Date(b.dateFirstRequest).getTime() - new Date(a.dateFirstRequest).getTime())
        .map((item: any) => ({
          date: new Date(item.dateFirstRequest).toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          }),
          name: item.customerFullName,
          id: item.customerId,
          clientType: item.clientType,
          applicationFormStatus: item.applicationFormStatus,
        })) || [],
  })

  if (query.isError) {
    toast.error('Произошла ошибка при получении списка новых клиентов')
  }

  return query
}
