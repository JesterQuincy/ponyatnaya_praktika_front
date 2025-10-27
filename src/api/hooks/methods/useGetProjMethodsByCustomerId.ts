import { useQuery } from '@tanstack/react-query'
import { EInvalidationTags } from '@/api/hooks/constants'
import { methodsService } from '@/services/methodsService'

type Options = {
  enabled?: boolean
  staleTime?: number
}

export const useGetProjMethodsByCustomerId = (
  id: number | string | undefined,
  { enabled = true, staleTime = 5 * 60 * 1000 }: Options = {},
) => {
  return useQuery({
    queryKey: [EInvalidationTags.MEET_METHOD, id],
    queryFn: () => methodsService.getProjMethodsByClient(Number(id)),
    enabled: Boolean(id) && enabled,
    staleTime,
    refetchOnWindowFocus: false,
  })
}
