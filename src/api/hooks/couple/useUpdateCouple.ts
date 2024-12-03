import { useMutation, useQueryClient } from '@tanstack/react-query'
import { EInvalidationTags } from '@/api/hooks/constants'
import { DeepPartial } from '@/types/common'
import { toast } from 'react-toastify'
import { ICouple } from '@/types/couple'
import { coupleService } from '@/services/couple.service'

export function useUpdateCouple() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [EInvalidationTags.COUPLE],
    mutationFn: (data: DeepPartial<ICouple>) => coupleService.updateCouple(data),
    onSuccess: () => {
      toast.success('Вы успешно обновили клиентов')
      queryClient.invalidateQueries({ queryKey: [EInvalidationTags.COUPLE] })
    },
    onError: () => {
      toast.error('Ошибка при обновлении клиентов')
    },
  })
}
