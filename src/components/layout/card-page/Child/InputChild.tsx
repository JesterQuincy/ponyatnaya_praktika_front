import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { UseFormReturn } from 'react-hook-form'
import { forwardRef, InputHTMLAttributes } from 'react'
import { IChildSchema } from '@/models/childSchema'
import { NonNullableNestedKeys } from '@/types/common'

interface InputCustomProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'form'> {
  form: UseFormReturn<IChildSchema>
  name: NonNullableNestedKeys<IChildSchema> // Используем тип NestedKeys для вложенных ключей
  label: string
}

export const InputChild = forwardRef<HTMLInputElement, InputCustomProps>(
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
                <input
                  {...field}
                  {...props}
                  type={type}
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

InputChild.displayName = 'InputCustom'
