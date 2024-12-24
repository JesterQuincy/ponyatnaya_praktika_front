import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authService } from '@/services/auth.service'
import { toast } from 'react-toastify'
import { IRegistrationFields } from '@/models/registrationSchema'
import { EInvalidationTags } from '@/api/hooks/constants'

export function useRegisterUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [EInvalidationTags.AUTH, EInvalidationTags.REGISTRATION],
    mutationFn: (data: IRegistrationFields) => authService.register(data),
    onSuccess: () => {
      toast.success('Регистрация прошла успешно!')
      queryClient.invalidateQueries({ queryKey: ['auth'] })
    },
    onError: () => {
      toast.error('Ошибка регистрации')
    },
  })
}
