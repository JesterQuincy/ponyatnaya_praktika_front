import { useQuery } from '@tanstack/react-query'
import { calendarService } from '@/services/calendar.service'

export function useGetCustomerByName(name: string) {
  return useQuery({
    queryKey: [name],
    queryFn: () => calendarService.getUsersByName(name).then((res) => res.data),
    enabled: !!name,
  })
}
