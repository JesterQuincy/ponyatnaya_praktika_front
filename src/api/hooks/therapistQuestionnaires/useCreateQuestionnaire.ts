import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { questionnaireService, QuestionnaireRequest } from '@/services/questionnaire.service'

export function useCreateQuestionnaire() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: QuestionnaireRequest) => questionnaireService.createQuestionnaire(data),
    onSuccess: () => {
      toast.success('Опросник успешно создан!')
      queryClient.invalidateQueries({ queryKey: ['questionnaires'] })
    },
    onError: () => {
      toast.error('Ошибка при создании опросника!')
    },
  })
}
