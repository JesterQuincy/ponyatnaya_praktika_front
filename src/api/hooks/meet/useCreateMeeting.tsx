import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ICreateMeeting } from '@/helpers/types/calendar'
import { EInvalidationTags } from '@/api/hooks/constants'
import { meetingService } from '@/services/meet.sevice'

export const useCreateMeeting = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [EInvalidationTags.MEET],
    mutationFn: (data: ICreateMeeting) => meetingService.createMeeting(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EInvalidationTags.CALENDAR] })
      queryClient.invalidateQueries({ queryKey: [EInvalidationTags.MEET] })
      queryClient.invalidateQueries({ queryKey: [EInvalidationTags.CLIENTS] })
    },
  })
}
