import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { methodsService } from '@/services/methodsService'

export const useGetMethodById = (id: number) => {
  const query = useQuery({
    queryKey: [id],
    queryFn: () => methodsService.getMethodById(id),
    enabled: !!id,
  })

  if (query.isError) {
    toast.error('Произошла ошибка')
  }

  return query
}
