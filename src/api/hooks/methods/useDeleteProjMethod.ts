import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { methodsService } from '@/services/methodsService'
import { EInvalidationTags } from '@/api/hooks/constants'

export const useDeleteProjMethod = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [EInvalidationTags.MEET_METHOD],
    mutationFn: (id: number) => methodsService.deleteProjMethod(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EInvalidationTags.MEET_METHOD] })

      toast.success('Вы успешно удалили методику')
    },
    onError: () => {
      toast.error('Ошибка при удалении методики')
    },
  })
}
