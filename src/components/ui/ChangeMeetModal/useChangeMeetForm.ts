import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useGetMeeting } from '@/api/hooks/meet/useGetMeeting'
import { baseSchema } from './schema'
import z from 'zod'
import moment from 'moment'
import { EPaymentType } from '../AddMeetModal'
import { useEffect, useMemo } from 'react'
import { EMeetingFormat } from '@/types/clients'

export const useChangeMeetForm = (meetId: number) => {
  const { data, isLoading } = useGetMeeting(meetId)

  const form = useForm<z.infer<typeof baseSchema>>({
    resolver: zodResolver(baseSchema),
  })

  const { watch, reset, control, handleSubmit, formState } = form

  const type = data?.customer ? 'client' : null

  const duration = useMemo(() => {
    if (!data?.endMeet || !data?.startMeet) return ''
    const end = moment(data.endMeet, 'HH:mm')
    const start = moment(data.startMeet, 'HH:mm')
    return String(end.diff(start, 'minute'))
  }, [data?.endMeet, data?.startMeet])

  useEffect(() => {
    if (data) {
      reset({
        dateMeet: data.dateMeet,
        time: data.startMeet,
        duration,
        paymentType: data.paymentType as EPaymentType,
        place: data.place,
        formatMeet: data.formatMeet as EMeetingFormat,
      })
    }
  }, [data, duration, reset])

  const numberFields = (value: string) => value.replace(/\D/g, '')

  return {
    clientType: data?.customer.clientType,
    isLoading,
    watch,
    type,
    control,
    formState,
    reset,
    handleSubmit,
    numberFields,
  }
}
