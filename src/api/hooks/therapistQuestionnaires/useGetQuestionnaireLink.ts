import { useMutation } from '@tanstack/react-query'
import { questionnaireService } from '@/services/questionnaire.service'

export function useGetQuestionnaireLink() {
  return useMutation({
    mutationFn: ({ customerId, questionnaireId }: { customerId: number; questionnaireId: number }) =>
      questionnaireService.getQuestionnaireLink({ customerId, questionnaireId }),
  })
}
