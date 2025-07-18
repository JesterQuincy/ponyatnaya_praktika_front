import { useMutation, useQueryClient } from '@tanstack/react-query'
import { EInvalidationTags } from '@/api/hooks/constants'
import { calendarService } from '@/services/calendar.service'
import { INonWorkingDay } from '@/types/calendar'

export const useCreateNonWorkingday = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['NonWorkingDay'],
    mutationFn: (data: INonWorkingDay) => calendarService.createNonWorkingDay(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EInvalidationTags.CALENDAR] })
      queryClient.refetchQueries({ queryKey: [EInvalidationTags.CALENDAR] })
    },
  })
}
