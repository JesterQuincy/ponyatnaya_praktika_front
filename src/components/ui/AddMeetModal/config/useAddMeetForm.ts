import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { schema, TAddMeetSchema } from '../schema'
import { ECreateMeetingRepeat } from '@/helpers/types/calendar'
import { EFinishRepetition, DEFAULT_VALUES } from '@/components/ui/AddMeetModal'

export const useAddMeetForm = () => {
  const form = useForm<TAddMeetSchema>({
    resolver: zodResolver(schema),
    defaultValues: DEFAULT_VALUES,
  })

  const {
    watch,
    setValue,
    getValues,
    clearErrors,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = form

  const repeat = watch('repeat')
  const type = watch('type')
  const finishRepetition = watch('finishRepetition')

  const numberFields = (value: string) => value.replace(/\D/g, '')

  const handleRepetitionChange = (value: string) => {
    setValue('repeat', value as ECreateMeetingRepeat)
    if (value === ECreateMeetingRepeat.NONE) {
      setValue('onCount', undefined, { shouldDirty: true })
      setValue('onDate', undefined, { shouldDirty: true })
      setValue('finishRepetition', undefined, { shouldDirty: true })
    } else {
      setValue('finishRepetition', EFinishRepetition.ON_DATE, { shouldDirty: true })
      setValue('onDate', getValues('dateMeet'), { shouldDirty: true })
    }

    clearErrors(['finishRepetition', 'onDate', 'onCount'])
  }

  const handleFinishRepetitionChange = (value: EFinishRepetition) => {
    setValue('finishRepetition', value)
    if (value === EFinishRepetition.ON_DATE) {
      setValue('onCount', undefined, { shouldDirty: true })
      setValue('onDate', getValues('dateMeet'), { shouldDirty: true })
      clearErrors('onCount')
    } else {
      setValue('onDate', '', { shouldDirty: true })
      clearErrors('onDate')
    }
  }

  return {
    watch,
    control,
    errors,
    repeat,
    type,
    finishRepetition,
    setValue,
    getValues,
    clearErrors,
    reset,
    handleSubmit,
    numberFields,
    handleRepetitionChange,
    handleFinishRepetitionChange,
  }
}
