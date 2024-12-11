import { useMutation } from '@tanstack/react-query'
import { AuthForm } from '@/helpers/types/auth'
import { authService } from '@/services/auth.service'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

export const useLogin = () => {
  const { push } = useRouter()

  return useMutation({
    mutationKey: ['auth'],
    mutationFn: (data: AuthForm) => authService.main(data),
    onSuccess() {
      toast.success('Login successful!')
      push('/calendar')
    },
  })
}
