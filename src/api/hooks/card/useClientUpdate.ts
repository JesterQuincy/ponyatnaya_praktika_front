import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { clientService } from '@/services/clients.service'
import { IClient } from '@/types/clients'
import { EInvalidationTags } from '@/api/hooks/constants'
import { DeepPartial } from '@/types/common'

export function useClientUpdate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [EInvalidationTags.CLIENT],
    mutationFn: (data: DeepPartial<IClient>) => clientService.updateUser(data),
    onSuccess: () => {
      toast.success('Вы успешно обновили клиента')
      queryClient.invalidateQueries({ queryKey: [EInvalidationTags.CLIENT] })
    },
    onError: () => {
      toast.error('Ошибка при обновлении клиента')
    },
  })
}
