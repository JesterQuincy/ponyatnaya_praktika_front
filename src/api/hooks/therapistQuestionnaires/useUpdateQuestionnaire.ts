import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { questionnaireService } from '@/services/questionnaire.service'
import { IQuestionnaireRequest } from '@/types/questionnaire'
import { EInvalidationTags } from '@/api/hooks/constants'

export function useUpdateQuestionnaire() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: IQuestionnaireRequest) => questionnaireService.updateQuestionnaire(data).then((res) => res.data),
    onSuccess: () => {
      toast.success('Материал успешно обновлен!')
      queryClient.invalidateQueries({ queryKey: [EInvalidationTags.QUESTIONNAIRES] })
    },
    onError: () => {
      toast.error('Ошибка при обновлении материала!')
    },
  })
}
