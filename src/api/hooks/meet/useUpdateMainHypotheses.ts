import { useMutation, useQueryClient } from '@tanstack/react-query'
import { clientService } from '@/services/clients.service'

export const useUpdateMainHypotheses = () => {
  return useMutation({
    mutationFn: ({ customerId, data }: { customerId: number; data: string }) =>
      clientService.updateMainHypotheses(customerId, data),
  })
}
