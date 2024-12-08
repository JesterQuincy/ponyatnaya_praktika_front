import { useMutation, useQueryClient } from '@tanstack/react-query'
import { DeepPartial } from '@/types/common'
import { toast } from 'react-toastify'
import { methodsService } from '@/services/methodsService'
import { EInvalidationTags } from '@/api/hooks/constants'
import { IMeetProjMethod } from '@/types/methods/meetMethods'

export const useUpdateProjMethod = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [EInvalidationTags.MEET_METHOD],
    mutationFn: (data: DeepPartial<IMeetProjMethod>) => methodsService.updateProjMethod(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EInvalidationTags.MEET_METHOD] })
    },
    onError: () => {
      toast.error('Ошибка при обновлении методики')
    },
  })
}
