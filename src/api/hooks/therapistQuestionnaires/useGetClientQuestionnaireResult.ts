import { useQuery } from '@tanstack/react-query'
import { questionnaireService } from '@/services/questionnaire.service'

export function useGetClientQuestionnaireResult(id: number | null) {
  return useQuery({
    queryKey: [id],
    queryFn: () => questionnaireService.getQuestionnaireClientResultById(id),
    staleTime: 5000,
    enabled: !!id,
  })
}
