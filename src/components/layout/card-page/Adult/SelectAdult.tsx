import Select from 'react-select'
import { IValueLabelModel } from '@/models/ILabelValueModel'
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { UseFormReturn } from 'react-hook-form'
import { NestedKeys } from '@/types/common'
import { IClientSchema } from '@/models/clientSchema'

interface ISelectHandlerProps {
  options?: IValueLabelModel[]
  form: UseFormReturn<IClientSchema>
  name: NestedKeys<IClientSchema>
  label: string
}

export function SelectAdult({ options, form, name, label }: ISelectHandlerProps) {
  return (
    <>
      <span>{label}</span>
      <FormField
        name={name}
        control={form.control}
        render={({ field }) => {
          const selectedOption = options?.find((option) => option.value === field.value) || null

          return (
            <FormItem>
              <FormControl>
                <Select
                  {...field}
                  onChange={(option) => {
                    field.onChange((option as IValueLabelModel)?.value)
                    form.trigger(name)
                  }}
                  options={options}
                  placeholder="Выберите"
                  value={selectedOption}
                  styles={{
                    control: (base) => ({
                      ...base,
                      height: '36px',
                      minHeight: '36px',
                      padding: '0 0 5px 0',
                      borderRadius: '12px',
                      maxWidth: '129px',
                      fontSize: '15px',
                    }),
                    indicatorSeparator: () => ({ display: 'none' }),
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )
        }}
      />
    </>
  )
}
