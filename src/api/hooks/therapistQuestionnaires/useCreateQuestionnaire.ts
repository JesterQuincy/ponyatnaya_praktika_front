import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { questionnaireService } from '@/services/questionnaire.service'
import { IQuestionnaireRequest } from '@/types/questionnaire'
import { EInvalidationTags } from '@/api/hooks/constants'

export function useCreateQuestionnaire() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: IQuestionnaireRequest) => questionnaireService.createQuestionnaire(data).then((res) => res.data),
    onSuccess: () => {
      toast.success('Материал успешно создан!')
      queryClient.invalidateQueries({ queryKey: [EInvalidationTags.QUESTIONNAIRES] })
    },
    onError: () => {
      toast.error('Ошибка при создании материала!')
    },
  })
}
