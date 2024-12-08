import { useQuery } from '@tanstack/react-query'
import { EInvalidationTags } from '@/api/hooks/constants'
import { toast } from 'react-toastify'
import { methodsService } from '@/services/methodsService'

export const useGetProjMethods = (id: number) => {
  const query = useQuery({
    queryKey: [EInvalidationTags.MEET_METHOD],
    queryFn: () => methodsService.getMeetProjMethods(id),
    enabled: !!id,
  })

  if (query.isError) {
    toast.error('Произошла ошибка')
  }

  return query
}
