import { useMutation, useQueryClient } from '@tanstack/react-query'
import { DeepPartial } from '@/types/common'
import { toast } from 'react-toastify'
import { profileLinkService } from '@/models/profile-link.service'
import { IClient } from '@/types/clients'
import { IChild } from '@/types/child'

export function useUpdateChildLink() {
  return useMutation({
    mutationFn: (data: DeepPartial<IChild>) => profileLinkService.updateChildLink(data),
    onError: () => {
      toast.error('Произошла ошибка')
    },
  })
}
