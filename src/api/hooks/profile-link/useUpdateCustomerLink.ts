import { useMutation } from '@tanstack/react-query'
import { DeepPartial } from '@/types/common'
import { toast } from 'react-toastify'
import { profileLinkService } from '@/services/profile-link.service'
import { IClient } from '@/types/clients'

export function useUpdateCustomerLink() {
  return useMutation({
    mutationFn: ({ data, token }: { data: DeepPartial<IClient>; token: string }) =>
      profileLinkService.updateCustomerLink(data, token),
    onError: () => {
      toast.error('Произошла ошибка')
    },
  })
}
