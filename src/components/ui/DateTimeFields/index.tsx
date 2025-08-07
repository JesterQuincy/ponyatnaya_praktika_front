import { cn } from '@/lib/utils'
import styles from '@/styles/AddMeetModal.module.css'
import { Control, Controller, FieldErrors, FieldPath, FieldValues } from 'react-hook-form'
import { ErrorField } from '@/components/ErrorField'
import React, { FC } from 'react'
import { TAddMeetSchema } from '@/components/ui/AddMeetModal/schema'

interface IDateTimeFieldsProps<T extends FieldValues> {
  control: Control<T>
  errors: FieldErrors<T>
  numberFields: (v: string) => string
  fieldNames: {
    dateMeet: FieldPath<T>
    time: FieldPath<T>
    duration: FieldPath<T>
  }
}

export const DateTimeFields = <T extends FieldValues>({
  control,
  errors,
  numberFields,
  fieldNames,
}: IDateTimeFieldsProps<T>) => {
  return (
    <div className="mb-[15px]">
      <div className={cn(styles.dateTime, 'flex items-end mb-0')}>
        <Controller
          control={control}
          name={fieldNames.dateMeet}
          render={({ field }) => (
            <div className="flex flex-col">
              <label className="font-montserrat text-[13px]">Дата</label>
              <input type="date" className="w-[fit-content]" {...field} value={field.value || ''} />
            </div>
          )}
        />
        <Controller
          control={control}
          name={fieldNames.time}
          render={({ field }) => (
            <div className="flex flex-col">
              <label className="font-montserrat text-[13px]">Время</label>
              <input type="time" className="min-w-[88px]" {...field} value={field.value || ''} />
            </div>
          )}
        />
        <Controller
          control={control}
          name={fieldNames.duration}
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
      <ErrorField
        message={
          (errors[fieldNames.dateMeet]?.message as string) ||
          (errors[fieldNames.time]?.message as string) ||
          (errors[fieldNames.duration]?.message as string)
        }
      />
    </div>
  )
}
