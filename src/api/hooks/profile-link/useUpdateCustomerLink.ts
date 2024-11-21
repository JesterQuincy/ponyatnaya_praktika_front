import { useMutation } from '@tanstack/react-query'
import { DeepPartial } from '@/types/common'
import { toast } from 'react-toastify'
import { profileLinkService } from '@/services/profile-link.service'
import { IClient } from '@/types/clients'

export function useUpdateCustomerLink() {
  return useMutation({
    mutationFn: (data: DeepPartial<IClient>) => profileLinkService.updateCustomerLink(data),
    onError: () => {
      toast.error('Произошла ошибка')
    },
  })
}
