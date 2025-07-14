import { useMutation, useQueryClient } from '@tanstack/react-query'
import { EInvalidationTags } from '@/api/hooks/constants'
import { UserMeeting } from '@/helpers/types/calendar'
import { calendarService } from '@/services/calendar.service'

export const useCreateCustomer = (clientType: 'adult' | 'child' | 'couple') => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['customer', 'create'],
    mutationFn: (data: UserMeeting) => {
      if (clientType === 'adult') {
        return calendarService.createAdultUser(data)
      } else if (clientType === 'child') {
        return calendarService.createChildUser(data)
      } else if (clientType === 'couple') {
        return calendarService.createCoupleUser(data)
      }
      throw new Error('Неизвестный тип клиента')
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EInvalidationTags.NOTIFICATIONS] })
    },
  })
}
