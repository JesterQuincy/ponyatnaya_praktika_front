import { useMutation } from '@tanstack/react-query'
import { DeepPartial } from '@/types/common'
import { toast } from 'react-toastify'
import { profileLinkService } from '@/models/profile-link.service'
import { ICouple } from '@/types/couple'

export function useUpdateCoupleLink() {
  return useMutation({
    mutationFn: (data: DeepPartial<ICouple>) => profileLinkService.updateCoupleLink(data),
    onError: () => {
      toast.error('Произошла ошибка')
    },
  })
}
