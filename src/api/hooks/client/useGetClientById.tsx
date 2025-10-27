import { useQuery } from '@tanstack/react-query'
import { EClientType } from '@/types/common'
import { clientService } from '@/services/clients.service'
import { EInvalidationTags } from '@/api/hooks/constants'

export function useClientByType(id: number | null, clientType: EClientType | null) {
  return useQuery({
    queryKey: [EInvalidationTags.CLIENT, clientType, id],
    enabled: Boolean(id && clientType),
    queryFn: async () => {
      if (!id || !clientType) throw new Error('no id/type')
      switch (clientType) {
        case EClientType.ADULT:
          return (await clientService.getClientById(id)).data
        case EClientType.CHILD:
          return (await clientService.getChildById(id)).data
        case EClientType.COUPLE:
          return (await clientService.getPairById(id)).data
        default:
          throw new Error('unknown client type')
      }
    },
    staleTime: 5 * 60 * 1000,
  })
}
