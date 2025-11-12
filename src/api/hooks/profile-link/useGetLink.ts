import { useMutation, useQueryClient } from '@tanstack/react-query'
import { profileLinkService } from '@/services/profile-link.service'
import { toast } from 'react-toastify'
import axios from 'axios'

type LinkData = { data: string }

export function useGetLink() {
  const queryClient = useQueryClient()

  return useMutation<LinkData, Error, string>({
    mutationKey: ['link'],
    mutationFn: (id: string) => profileLinkService.getLink(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['link'] })
    },
    onError: (err: unknown) => {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 409) {
          const msg = err.response.data
          toast.warning(msg, { autoClose: 5000 })
        }
      }
    },
  })
}
