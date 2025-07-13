import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { EInvalidationTags } from '@/api/hooks/constants'
import { accountService } from '@/services/account.service'
import { IAccount } from '@/types/account'

export function useUpdateAccount() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [EInvalidationTags.ACCOUNT_INFO],
    mutationFn: (data: IAccount) => accountService.updateAccount(data),
    onSuccess: () => {
      toast.success('Успешно обновленно')
      queryClient.invalidateQueries({ queryKey: [EInvalidationTags.ACCOUNT_INFO] })
    },
    onError: () => {
      toast.error('Ошибка при обновлении')
    },
  })
}
