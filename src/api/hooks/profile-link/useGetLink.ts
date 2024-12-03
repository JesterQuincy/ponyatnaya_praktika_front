import { useMutation, useQueryClient } from '@tanstack/react-query'
import { profileLinkService } from '@/models/profile-link.service'
import { toast } from 'react-toastify'

export function useGetLink() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['link'],
    mutationFn: (id: string) => profileLinkService.getLink(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['link'] })
    },
    onError: () => {
      toast.error('Произошла ошибка при получении ссылки')
    },
  })
}
