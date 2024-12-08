import { useQuery } from '@tanstack/react-query'
import { EInvalidationTags } from '@/api/hooks/constants'
import { toast } from 'react-toastify'
import { photoMethodsService } from '@/services/photoMethodsService'

export const useGetPhoto = (id: number) => {
  const query = useQuery({
    queryKey: [EInvalidationTags.MEET_METHOD],
    queryFn: () => photoMethodsService.getPhoto(id),
  })

  if (query.isError) {
    toast.error('Произошла ошибка')
  }

  return query
}
