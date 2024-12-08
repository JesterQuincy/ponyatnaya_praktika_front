import { useMutation, useQueryClient } from '@tanstack/react-query'
import { DeepPartial } from '@/types/common'
import { toast } from 'react-toastify'
import { methodsService } from '@/services/methodsService'
import { IMethodic } from '@/types/methods'
import { EInvalidationTags } from '@/api/hooks/constants'

export const useCreateMethodType = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [EInvalidationTags.METHOD],
    mutationFn: (data: DeepPartial<IMethodic>) => methodsService.createType(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EInvalidationTags.METHOD] })
    },
    onError: () => {
      toast.error('Ошибка при создании типа методики')
    },
  })
}
