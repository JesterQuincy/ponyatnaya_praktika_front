import { Controller, Control, FieldErrors } from 'react-hook-form'
import { TAddMeetSchema } from '../schema'
import { ErrorField } from '@/components/ErrorField'
import styles from '@/styles/AddMeetModal.module.css'
import { FC } from 'react'

interface IControlledSelectProps {
  name: keyof TAddMeetSchema
  control: Control<TAddMeetSchema>
  errors: FieldErrors<TAddMeetSchema>
  label: string
  options: { value: string; label: string }[]
  className?: string
  onChange?: (value: string) => void
}

export const ControlledSelect: FC<IControlledSelectProps> = ({
  name,
  control,
  errors,
  label,
  options,
  className,
  onChange,
}) => (
  <Controller
    control={control}
    name={name}
    render={({ field }) => (
      <div className="flex flex-col">
        <label className="font-montserrat text-[13px]">{label}</label>
        <select
          {...field}
          onChange={(e) => {
            field.onChange(e.target.value)
            onChange?.(e.target.value)
          }}
          className={className || styles.input}>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ErrorField message={errors[name]?.message} />
      </div>
    )}
  />
)
