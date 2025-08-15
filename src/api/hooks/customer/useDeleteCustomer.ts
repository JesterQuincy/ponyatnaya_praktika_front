import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { calendarService } from '@/services/calendar.service'
import { EInvalidationTags } from '../constants'

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['DELETE_USER'],
    mutationFn: (id: number) => calendarService.deleteUserById(id),
    onSuccess: () => {
      toast.success('Вы успешно удалили клиента')
      queryClient.invalidateQueries({ queryKey: [EInvalidationTags.CLIENTS] })
    },
    onError: () => {
      toast.error('Ошибка при удалении клиента')
    },
  })
}
