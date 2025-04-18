import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { UseFormReturn } from 'react-hook-form'
import { forwardRef, InputHTMLAttributes } from 'react'
import { NonNullableNestedKeys } from '@/types/common'
import { IClientSchema } from '@/models/clientSchema'
import { Textarea } from '@/components/ui/textarea'

interface InputCustomProps extends Omit<InputHTMLAttributes<HTMLTextAreaElement>, 'form'> {
  form: UseFormReturn<IClientSchema>
  name: NonNullableNestedKeys<IClientSchema>
  label: string
}

export const TextareaAdult = forwardRef<HTMLTextAreaElement, InputCustomProps>(
  ({ name, form, label, type = 'text', ...props }, ref) => {
    return (
      <>
        <span>{label}</span>
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  {...field}
                  {...props}
                  ref={ref}
                  className="p-2 border rounded-xl border-[#D9D9D9] text-sm"
                  placeholder="Введите"
                />
              </FormControl>
              <FormMessage className="text-orange" />
            </FormItem>
          )}
        />
      </>
    )
  },
)

TextareaAdult.displayName = 'InputCustom'
