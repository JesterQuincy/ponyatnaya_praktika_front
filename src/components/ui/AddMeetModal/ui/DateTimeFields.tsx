import { cn } from '@/lib/utils'
import styles from '@/styles/AddMeetModal.module.css'
import { Control, Controller, FieldErrors } from 'react-hook-form'
import { ErrorField } from '@/components/ErrorField'
import React, { FC } from 'react'
import { TAddMeetSchema } from '@/components/ui/AddMeetModal/schema'

interface IDateTimeFieldsProps {
  control: Control<TAddMeetSchema>
  errors: FieldErrors<TAddMeetSchema>
  numberFields: (v: string) => string
}

export const DateTimeFields: FC<IDateTimeFieldsProps> = ({ control, errors, numberFields }) => {
  return (
    <div className="mb-[15px]">
      <div className={cn(styles.dateTime, 'flex items-end mb-0')}>
        <Controller
          control={control}
          name="dateMeet"
          render={({ field }) => (
            <div className="flex flex-col">
              <label className="font-montserrat text-[13px]">Дата</label>
              <input type="date" className="w-[fit-content]" {...field} value={field.value || ''} />
            </div>
          )}
        />
        <Controller
          control={control}
          name="time"
          render={({ field }) => (
            <div className="flex flex-col">
              <label className="font-montserrat text-[13px]">Время</label>
              <input type="time" className="min-w-[88px]" {...field} value={field.value || ''} />
            </div>
          )}
        />
        <Controller
          control={control}
          name="duration"
          render={({ field }) => (
            <div className="flex gap-[4px] items-center">
              <input
                type="text"
                className="max-w-[50px]"
                {...field}
                onChange={(e) => {
                  field.onChange(numberFields(e.target.value))
                }}
                value={field.value || ''}
              />
              <span className="font-montserrat text-[14px]">минут</span>
            </div>
          )}
        />
      </div>
      <ErrorField message={errors.dateMeet?.message || errors.time?.message || errors.duration?.message} />
    </div>
  )
}
