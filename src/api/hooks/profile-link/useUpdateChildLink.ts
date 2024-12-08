import { useMutation } from '@tanstack/react-query'
import { DeepPartial } from '@/types/common'
import { toast } from 'react-toastify'
import { profileLinkService } from '@/services/profile-link.service'
import { IChild } from '@/types/child'

export function useUpdateChildLink() {
  return useMutation({
    mutationFn: (data: DeepPartial<IChild>) => profileLinkService.updateChildLink(data),
    onError: () => {
      toast.error('Произошла ошибка')
    },
  })
}
