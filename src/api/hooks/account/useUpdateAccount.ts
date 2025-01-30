import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { EInvalidationTags } from '@/api/hooks/constants'
import { accountService } from '@/services/account.service'
import { IAccount } from '@/types/account'

export function useUpdateAccount() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [EInvalidationTags.ACCOUNT],
    mutationFn: (data: IAccount) => accountService.updateAccount(data),
    onSuccess: () => {
      toast.success('Успешно обновленно')
      queryClient.invalidateQueries({ queryKey: [EInvalidationTags.ACCOUNT] })
    },
    onError: () => {
      toast.error('Ошибка при обновлении')
    },
  })
}
