import { useMutation } from '@tanstack/react-query'
import { DeepPartial } from '@/types/common'
import { toast } from 'react-toastify'
import { photoMethodsService } from '@/services/photoMethodsService'
import { IPhotoProjectiveMethod } from '@/types/methods/photo'

export const useCreatePhoto = () => {
  return useMutation({
    mutationFn: (data: DeepPartial<IPhotoProjectiveMethod>) => photoMethodsService.createPhoto(data),
    onError: () => {
      toast.error('Ошибка при создании фото')
    },
  })
}
