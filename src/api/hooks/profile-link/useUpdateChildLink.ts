import { useMutation } from '@tanstack/react-query'
import { DeepPartial } from '@/types/common'
import { profileLinkService } from '@/services/profile-link.service'
import { IChild } from '@/types/child'

export function useUpdateChildLink() {
  return useMutation({
    mutationFn: ({ data, token }: { data: DeepPartial<IChild>; token: string }) =>
      profileLinkService.updateChildLink(data, token),
  })
}
