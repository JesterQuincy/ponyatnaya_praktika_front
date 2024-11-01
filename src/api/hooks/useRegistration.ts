import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authService } from '@/services/auth.service'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { registrationSchema } from '@/models/registrationSchema'
import { useRouter } from 'next/navigation'

export function useRegisterUser() {
  const { push } = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['auth', 'registration'],
    mutationFn: (data: z.infer<typeof registrationSchema>) => authService.register(data),
    onSuccess: () => {
      toast.success('Регистрация прошла успешно!')
      queryClient.invalidateQueries({ queryKey: ['auth'] })
      push('/calendar')
    },
    onError: () => {
      toast.error('Ошибка регистрации')
    },
  })
}
