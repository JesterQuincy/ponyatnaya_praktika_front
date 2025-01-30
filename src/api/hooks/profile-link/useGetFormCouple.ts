import { useQuery } from '@tanstack/react-query'
import { profileLinkService } from '@/services/profile-link.service'

export function useGetFormCouple(token: string) {
  return useQuery({
    queryKey: [token],
    queryFn: () => profileLinkService.getFormCouple(token),
    enabled: !!token,
  })
}
