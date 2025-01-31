import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { questionnaireService } from '@/services/questionnaire.service'
import { IQuestionnaireResult } from '@/types/questionnaire'

export function useSaveQuestionnaire() {
  return useMutation({
    mutationFn: ({ data, token }: { data: IQuestionnaireResult; token: string }) =>
      questionnaireService.saveQuestionnaireResult(data, token).then((res) => res.data),
    onError: () => {
      toast.error('Ошибка при отправке результатов!')
    },
  })
}
