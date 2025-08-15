import { Controller, Control, FieldErrors } from 'react-hook-form'
import { TAddMeetSchema } from '../schema'
import { ErrorField } from '@/components/ErrorField'
import styles from '@/styles/AddMeetModal.module.css'
import { cn } from '@/lib/utils'
import { FC } from 'react'

interface IControlledInputProps {
  name: keyof TAddMeetSchema
  control: Control<TAddMeetSchema>
  errors?: FieldErrors<TAddMeetSchema>
  label?: string
  placeholder?: string
  type?: string
  className?: string
  parse?: (val: string) => string
  disabled?: boolean
}

export const ControlledInput: FC<IControlledInputProps> = ({
  name,
  control,
  errors,
  label,
  placeholder,
  type = 'text',
  className,
  parse,
  disabled,
}) => (
  <Controller
    control={control}
    name={name}
    render={({ field }) => (
      <div className="flex flex-col mb-[15px]">
        {label && <label className="font-montserrat text-[13px]">{label}</label>}
        <input
          type={type}
          className={cn(styles.input, className)}
          placeholder={placeholder}
          value={field.value || ''}
          onChange={(e) => field.onChange(parse ? parse(e.target.value) : e.target.value)}
          disabled={disabled}
        />
        {errors && <ErrorField message={errors[name]?.message} />}
      </div>
    )}
  />
)
