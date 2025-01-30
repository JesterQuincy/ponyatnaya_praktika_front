import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { EInvalidationTags } from '@/api/hooks/constants'
import { accountService } from '@/services/account.service'

export const useGetAccount = () => {
  const query = useQuery({
    queryKey: [EInvalidationTags.ACCOUNT],
    queryFn: () => accountService.getAccount(),
  })

  if (query.isError) {
    toast.error('Произошла ошибка')
  }

  return query
}
