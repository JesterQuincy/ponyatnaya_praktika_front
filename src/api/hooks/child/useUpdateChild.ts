import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { EInvalidationTags } from '@/api/hooks/constants'
import { IChild } from '@/types/child'
import { childService } from '@/services/child.service'
import { DeepPartial } from '@/types/common'

export function useUpdateChild() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [EInvalidationTags.CHILD],
    mutationFn: (data: DeepPartial<IChild>) => childService.updateChild(data),
    onSuccess: () => {
      toast.success('Вы успешно обновили клиента')
      queryClient.invalidateQueries({ queryKey: [EInvalidationTags.CHILD] })
    },
    onError: () => {
      toast.error('Ошибка при обновлении клиента')
    },
  })
}
