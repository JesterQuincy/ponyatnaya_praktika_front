import { useMutation, useQueryClient } from '@tanstack/react-query'
import { UserMeeting } from '@/helpers/types/calendar'
import { EInvalidationTags } from '@/api/hooks/constants'
import { meetingService } from '@/services/meet.sevice'

export const useCreateMeeting = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [EInvalidationTags.MEET],
    mutationFn: (data: UserMeeting) => meetingService.createMeeting(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EInvalidationTags.CALENDAR] })
      queryClient.invalidateQueries({ queryKey: [EInvalidationTags.MEET] })
      queryClient.refetchQueries({ queryKey: [EInvalidationTags.CALENDAR] })
    },
  })
}
