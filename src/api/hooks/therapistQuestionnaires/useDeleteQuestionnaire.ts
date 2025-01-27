import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { questionnaireService } from '@/services/questionnaire.service'
import { EInvalidationTags } from '@/api/hooks/constants'

export function useDeleteQuestionnaire() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => questionnaireService.deleteQuestionnaire(id),
    onError: () => {
      toast.error('Произошла ошибка')
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EInvalidationTags.QUESTIONNAIRES] })
      toast.success('Материал успешно удален!')
    },
    mutationKey: [EInvalidationTags.QUESTIONNAIRES],
  })
}
