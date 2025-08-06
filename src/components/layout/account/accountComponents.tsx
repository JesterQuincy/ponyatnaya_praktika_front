'use client'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { accountSchema } from '@/models/accountSchema'
import { NonNullableNestedKeys } from '@/types/common'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

interface AccountProps {
  form: UseFormReturn<z.infer<typeof accountSchema>>
  name: NonNullableNestedKeys<z.infer<typeof accountSchema>>
  label: string
  type?: string
}

export function InputAccount({ form, name, label, type, textarea = false }: AccountProps & { textarea?: boolean }) {
  if (name === 'userDiplomasList') return null

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className="flex gap-3 flex-col w-auto">
              <FormLabel className="font-bold">{label}</FormLabel>
              {textarea ? (
                <Textarea
                  {...field}
                  placeholder={label}
                  value={field.value || undefined}
                  className="bg-white rounded-[6px] border-gray"
                />
              ) : (
                <Input
                  {...field}
                  type={type}
                  placeholder={label}
                  value={field.value || undefined}
                  className="bg-white rounded-[6px]"
                />
              )}
            </div>
          </FormControl>
          <FormMessage className="text-red-500" />
        </FormItem>
      )}
    />
  )
}
