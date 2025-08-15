import { Controller, Control, FieldErrors, FieldValues, Path } from 'react-hook-form'
import { ErrorField } from '@/components/ErrorField'
import styles from '@/styles/AddMeetModal.module.css'

interface IControlledSelectProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  errors: FieldErrors<T>
  label: string
  options: { value: string; label: string }[]
  className?: string
  onChange?: (value: string) => void
}

export const ControlledSelect = <T extends FieldValues>({
  name,
  control,
  errors,
  label,
  options,
  className,
  onChange,
}: IControlledSelectProps<T>) => (
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
        {typeof errors[name]?.message === 'string' && <ErrorField message={errors[name]?.message} />}
      </div>
    )}
  />
)
