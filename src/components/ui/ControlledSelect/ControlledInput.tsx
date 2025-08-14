import { Controller, Control, FieldErrors, FieldValues, Path } from 'react-hook-form'
import { ErrorField } from '@/components/ErrorField'
import styles from '@/styles/AddMeetModal.module.css'
import { cn } from '@/lib/utils'

interface IControlledInputProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  errors?: FieldErrors<T>
  label?: string
  placeholder?: string
  type?: string
  className?: string
  parse?: (val: string) => string
  disabled?: boolean
}

export const ControlledInput = <T extends FieldValues>({
  name,
  control,
  errors,
  label,
  placeholder,
  type = 'text',
  className,
  parse,
  disabled,
}: IControlledInputProps<T>) => (
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
        {typeof errors?.[name]?.message === 'string' && <ErrorField message={errors[name]?.message} />}
      </div>
    )}
  />
)
