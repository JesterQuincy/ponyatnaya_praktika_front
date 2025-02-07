import { useMutation, useQueryClient } from '@tanstack/react-query'
import { EInvalidationTags } from '@/api/hooks/constants'
import { DeepPartial } from '@/types/common'
import { toast } from 'react-toastify'
import { IMeetingDetails } from '@/types/meet/getMeetById'
import { meetingService } from '@/services/meet.sevice'

export const useUpdateMeeting = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [EInvalidationTags.MEET_ID],
    mutationFn: (data: DeepPartial<IMeetingDetails>) => meetingService.updateMeeting(data),
    onSuccess: () => {
      toast.success('Вы успешно обновили встречу')
      queryClient.invalidateQueries({ queryKey: [EInvalidationTags.MEET_ID] })
    },
    onError: () => {
      toast.error('Ошибка при обновлении встречи')
    },
  })
}
