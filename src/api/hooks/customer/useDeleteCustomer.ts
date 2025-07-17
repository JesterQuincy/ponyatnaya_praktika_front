import { useMutation, useQueryClient } from '@tanstack/react-query'
import { EInvalidationTags } from '@/api/hooks/constants'
import { DeepPartial } from '@/types/common'
import { toast } from 'react-toastify'
import { calendarService } from '@/services/calendar.service'

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['DELETE_USER'],
    mutationFn: (id: number) => calendarService.deleteUserById(id),
    onSuccess: () => {
      toast.success('Вы успешно удалили клиента')
      // queryClient.invalidateQueries({ queryKey: [EInvalidationTags.MEET_ID] })
    },
    onError: () => {
      toast.error('Ошибка при удалении клиента')
    },
  })
}
