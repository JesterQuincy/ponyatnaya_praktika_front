import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { questionnaireSchema } from '@/models/questionnaireSchema'
import { z } from 'zod'

export function useQuestionnaireForm() {
  const form = useForm<z.infer<typeof questionnaireSchema>>({
    resolver: zodResolver(questionnaireSchema),
    defaultValues: {
      type: 'Взрослый',
      lastName: '',
      firstName: '',
      patronymic: '',
      phone: '+7',
      email: '',
      gender: 'Мужчина',
      status: 'По запросу',
      contactMethod: 'Мессенджер',
      initialRequest: '',
      meetingFormat: 'Онлайн',
      platform: 'Zoom',
      preferredTime: '',
      financialTerms: '',
    },
  })

  const onSubmit = (data: z.infer<typeof questionnaireSchema>) => {
    console.log(data)
  }

  return { form, onSubmit }
}
