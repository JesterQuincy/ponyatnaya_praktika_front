import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { photoMethodsService } from '@/services/photoMethodsService'

export const useGetTypePhoto = () => {
  return useMutation({
    mutationFn: ({ customerId, typeMethodId }: { customerId: number; typeMethodId: number }) =>
      photoMethodsService.getMethodTypesPhoto({ customerId, typeMethodId }),
    onError: () => {
      toast.error('Произошла ошибка при загрузке фото')
    },
  })
}
