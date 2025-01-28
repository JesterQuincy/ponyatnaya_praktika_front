import { useMutation } from '@tanstack/react-query'
import { DeepPartial } from '@/types/common'
import { profileLinkService } from '@/services/profile-link.service'
import { ICouple } from '@/types/couple'

export function useUpdateCoupleLink() {
  return useMutation({
    mutationFn: ({ data, token }: { data: DeepPartial<ICouple>; token: string }) =>
      profileLinkService.updateCoupleLink(data, token),
  })
}
