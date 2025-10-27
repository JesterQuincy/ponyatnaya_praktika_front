import { useMutation, useQueryClient } from '@tanstack/react-query'
import { EInvalidationTags } from '@/api/hooks/constants'
import { calendarService } from '@/services/calendar.service'

export const useDeleteNonWorkingDay = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [EInvalidationTags.MEET_ID],
    mutationFn: (id: number) => calendarService.deleteNonWorkingDay(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EInvalidationTags.CALENDAR] })
    },
  })
}
