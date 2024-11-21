import { useQuery } from '@tanstack/react-query'
import { EInvalidationTags } from '@/api/hooks/constants'
import { toast } from 'react-toastify'
import { methodsService } from '@/services/methodsService'

export const useGetAllTypes = () => {
  const query = useQuery({
    queryKey: [EInvalidationTags.METHOD],
    queryFn: () => methodsService.getAllTypes(),
  })

  if (query.isError) {
    toast.error('Произошла ошибка')
  }

  return query
}
