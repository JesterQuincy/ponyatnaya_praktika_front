import { useQuery } from '@tanstack/react-query'
import { profileLinkService } from '@/services/profile-link.service'

export function useGetFormCustomer(token: string) {
  return useQuery({
    queryKey: [token],
    queryFn: () => profileLinkService.getFormCustomer(token),
    enabled: !!token,
  })
}
