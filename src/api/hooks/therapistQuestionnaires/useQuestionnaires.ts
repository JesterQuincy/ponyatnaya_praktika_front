import { useQuery } from '@tanstack/react-query'

import { Questionnaire } from '@/types/questionnaire'
import { questionnaireService } from '@/services/questionnaireService'

export function useQuestionnaires(offset: number, limit: number = 7) {
  return useQuery({
    queryKey: ['questionnaires', offset, limit],
    queryFn: () => questionnaireService.getQuestionnaires(offset, limit).then((res) => res.data),
    staleTime: 5000,
  })
}
