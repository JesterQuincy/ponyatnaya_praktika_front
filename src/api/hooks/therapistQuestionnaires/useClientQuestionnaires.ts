import { useQuery } from '@tanstack/react-query'
import { questionnaireService } from '@/services/questionnaire.service'
import { EInvalidationTags } from '@/api/hooks/constants'

export function useClientQuestionnaires({
  id,
  offset,
  limit = 7,
  orderIsTest,
  orderDate,
}: {
  id: number
  offset: number
  limit?: number
  orderIsTest?: 'asc' | 'desc' | ''
  orderDate?: 'desc' | 'asc' | ''
}) {
  return useQuery({
    queryKey: [EInvalidationTags.QUESTIONNAIRES_CLIENT, offset, limit, orderDate, orderIsTest],
    queryFn: () => questionnaireService.getQuestionnaireClientResults({ id, offset, limit, orderDate, orderIsTest }),
    staleTime: 5000,
    enabled: !!id,
  })
}
