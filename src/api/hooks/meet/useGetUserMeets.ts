import { useQuery } from '@tanstack/react-query'
import { EInvalidationTags } from '@/api/hooks/constants'
import { clientService } from '@/services/clients.service'
import { toast } from 'react-toastify'

export const useGetUserMeets = (id: number, limit: number, offset: number) => {
  const query = useQuery({
    queryKey: [EInvalidationTags.MEET, id, limit, offset],
    queryFn: () => clientService.getUserMeets(id, offset, limit),
    staleTime: 5 * 60 * 1000,
  })

  if (query.isError) {
    toast.error('Произошла ошибка при получении клиентов')
  }

  return query
}
