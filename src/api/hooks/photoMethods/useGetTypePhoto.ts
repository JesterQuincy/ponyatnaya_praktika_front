import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { photoMethodsService } from '@/services/photoMethodsService'

export const useGetTypePhoto = () => {
  return useMutation({
    mutationFn: (id: number) => photoMethodsService.getMethodTypesPhoto(id),
    onError: () => {
      toast.error('Произошла ошибка при загрузке фото')
    },
  })
}
