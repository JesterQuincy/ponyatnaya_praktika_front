import { useQuery } from '@tanstack/react-query'
import { accountService } from '@/services/account.service'
import { EInvalidationTags } from '@/api/hooks/constants'

export const useGetUserInfo = () => {
  return useQuery({
    queryKey: [EInvalidationTags.ACCOUNT_INFO],
    queryFn: () => accountService.getUserInfo().then((res) => res.data),
  })
}
