import { useQuery } from '@tanstack/react-query'
import { EInvalidationTags } from '@/api/hooks/constants'
import { clientService } from '@/services/clients.service'
import { IGetClientBySearchRequest } from '@/types/clients'
import { toast } from 'react-toastify'

export const useGetClients = ({ params, queryBody }: IGetClientBySearchRequest) => {
  const query = useQuery({
    queryKey: [EInvalidationTags.CLIENTS, params.limit, params.offset, queryBody],
    queryFn: () => clientService.getClients({ params, queryBody }),
    staleTime: 5 * 60 * 1000,
  })

  if (query.isError) {
    toast.error('Произошла ошибка при получении клиентов')
  }

  return query
}
