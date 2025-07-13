import { useQuery } from '@tanstack/react-query'
import { accountService } from '@/services/account.service'
import { EInvalidationTags } from '@/api/hooks/constants'
import { toast } from 'react-toastify'

export const useGetUserInfo = () => {
  const query = useQuery({
    queryKey: [EInvalidationTags.ACCOUNT_INFO],
    queryFn: () => accountService.getUserInfo().then((res) => res.data),
  })

  if (query.isError) {
    toast.error('Произошла ошибка')
  }

  return query
}
