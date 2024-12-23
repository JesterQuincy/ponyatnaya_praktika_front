import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { UseFormReturn } from 'react-hook-form'
import { forwardRef, InputHTMLAttributes } from 'react'
import { NonNullableNestedKeys } from '@/types/common'
import { Textarea } from '@/components/ui/textarea'
import { IChildSchema } from '@/models/childSchema'

interface InputCustomProps extends Omit<InputHTMLAttributes<HTMLTextAreaElement>, 'form'> {
  form: UseFormReturn<IChildSchema>
  name: NonNullableNestedKeys<IChildSchema>
  label: string
}

export const TextareaChild = forwardRef<HTMLTextAreaElement, InputCustomProps>(
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
                  value={field.value !== null && field.value !== undefined ? String(field.value) : ''} // Приводим значение к строке
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

TextareaChild.displayName = 'InputCustom'
