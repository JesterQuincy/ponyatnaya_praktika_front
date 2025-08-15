import { useMutation, useQueryClient } from '@tanstack/react-query'
import { EInvalidationTags } from '@/api/hooks/constants'
import { meetingService } from '@/services/meet.sevice'

export const useDeleteMeeting = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [EInvalidationTags.MEET_ID],
    mutationFn: (id: number) => meetingService.deleteMeeting(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EInvalidationTags.MEET] })
      queryClient.invalidateQueries({ queryKey: [EInvalidationTags.MEET_ID] })
      queryClient.invalidateQueries({ queryKey: [EInvalidationTags.CALENDAR] })
      queryClient.refetchQueries({ queryKey: [EInvalidationTags.CALENDAR] })
    },
  })
}
