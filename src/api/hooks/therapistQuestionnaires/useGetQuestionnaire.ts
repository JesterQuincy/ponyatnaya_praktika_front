import { useQuery } from '@tanstack/react-query'
import { questionnaireService } from '@/services/questionnaire.service'

export function useGetQuestionnaire(id: string | null, token?: string | null) {
  return useQuery({
    queryKey: [id],
    queryFn: () => questionnaireService.getQuestionnaireById(id, token),
    staleTime: 5000,
    enabled: !!id,
  })
}
