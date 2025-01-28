import { useQuery } from '@tanstack/react-query'
import { profileLinkService } from '@/services/profile-link.service'

export function useGetFormChild(token: string) {
  return useQuery({
    queryKey: [token],
    queryFn: () => profileLinkService.getFormChild(token),
    enabled: !!token,
  })
}
