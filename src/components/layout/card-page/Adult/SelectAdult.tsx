import { IValueLabelModel } from '@/models/ILabelValueModel'
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { UseFormReturn } from 'react-hook-form'
import { NonNullableNestedKeys } from '@/types/common'
import { IClientSchema } from '@/models/clientSchema'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface ISelectHandlerProps {
  options?: IValueLabelModel[]
  form: UseFormReturn<IClientSchema>
  name: NonNullableNestedKeys<IClientSchema>
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
          return (
            <FormItem className="max-h-[38px]">
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="border-gray rounded-xl bg-white">
                    <SelectValue placeholder="Выберите" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="border-gray bg-white rounded-[6px]">
                  {options?.map((o) => (
                    <SelectItem key={o.value} value={String(o.value)}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )
        }}
      />
    </>
  )
}
