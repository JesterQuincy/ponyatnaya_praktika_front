import { useQuery } from '@tanstack/react-query'
import { EInvalidationTags } from '@/api/hooks/constants'
import { toast } from 'react-toastify'
import { methodsService } from '@/services/methodsService'

export const useGetProjMethodsByCustomerId = (id: string) => {
  const query = useQuery({
    queryKey: [EInvalidationTags.MEET_METHOD],
    queryFn: () => methodsService.getProjMethodsByClient(Number(id)),
    enabled: !!id,
  })

  if (query.isError) {
    toast.error('Произошла ошибка')
  }

  return query
}
