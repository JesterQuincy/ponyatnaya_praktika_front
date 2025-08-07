import { DeepPartial, Resolver, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { EPaymentType, TAddMeetSchema } from '@/components/ui/AddMeetModal'
import { z } from 'zod'
import { useGetMeeting } from '@/api/hooks/meet/useGetMeeting'
import { da } from 'date-fns/locale'
import { IMeetingDetails } from '@/types/meet/getMeetById'
import { IMeetingSchema } from '@/models/meetSchema'
import { baseSchema } from './schema'
import { EMeetingFormat } from '@/types/clients'

type TFormSchema = {
  dateMeet: string
  time: string
  duration: number
  formatMeet: EMeetingFormat
  place: string
  paymentType?: EPaymentType
}

export const useChangeMeetForm = (meetId: string) => {
  const { data } = useGetMeeting(meetId)

  const form = useForm<TFormSchema>({
    resolver: zodResolver(baseSchema),
  })

  const {
    watch,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = form

  const numberFields = (value: string) => value.replace(/\D/g, '')

  return {
    watch,
    control,
    errors,
    reset,
    handleSubmit,
    numberFields,
  }
}
