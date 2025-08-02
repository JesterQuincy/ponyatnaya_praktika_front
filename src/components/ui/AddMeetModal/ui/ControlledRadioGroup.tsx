import { Controller, Control } from 'react-hook-form'
import { TAddMeetSchema } from '../schema'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

export interface IOption<T extends string> {
  label: string
  value: T
}

interface IControlledRadioGroupProps<T extends string> {
  name: keyof Pick<TAddMeetSchema, 'type' | 'finishRepetition'>
  control: Control<TAddMeetSchema>
  options: IOption<T>[]
  onChange?: (value: T) => void
  className?: string
}

export const ControlledRadioGroup = <T extends string>({
  name,
  control,
  options,
  onChange,
  className,
}: IControlledRadioGroupProps<T>) => (
  <Controller
    control={control}
    name={name}
    render={({ field }) => (
      <RadioGroup
        {...field}
        onValueChange={(value) => {
          field.onChange(value)
          onChange?.(value as T)
        }}
        className={className}>
        {options.map((opt) => (
          <div key={opt.value} className="flex items-center space-x-2">
            <RadioGroupItem value={opt.value} id={opt.value} />
            <Label htmlFor={opt.value}>{opt.label}</Label>
          </div>
        ))}
      </RadioGroup>
    )}
  />
)
