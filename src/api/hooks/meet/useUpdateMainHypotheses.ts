import { useMutation, useQueryClient } from '@tanstack/react-query'
import { clientService } from '@/services/clients.service'
import { toast } from 'react-toastify'

export const useUpdateMainHypotheses = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ customerId, data }: { customerId: number; data: string }) =>
      clientService.updateMainHypotheses(customerId, data),

    onSuccess: () => {
      toast.success('Успешно обновленно')
      queryClient.invalidateQueries({ queryKey: ['customer', 'mainHypotheses'] })
    },
  })
}
