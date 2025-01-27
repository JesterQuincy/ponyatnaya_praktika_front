import { useQuery } from '@tanstack/react-query'
import { questionnaireService } from '@/services/questionnaire.service'
import { EInvalidationTags } from '@/api/hooks/constants'

export function useQuestionnaires({
  offset,
  limit = 7,
  orderIsTest,
  orderDate,
}: {
  offset: number
  limit?: number
  orderIsTest?: 'asc' | 'desc'
  orderDate?: 'desc' | 'asc'
}) {
  return useQuery({
    queryKey: [EInvalidationTags.QUESTIONNAIRES, offset, limit, orderDate, orderIsTest],
    queryFn: () =>
      questionnaireService.getQuestionnaires({ offset, limit, orderDate, orderIsTest }).then((res) => res.data),
    staleTime: 5000,
  })
}
