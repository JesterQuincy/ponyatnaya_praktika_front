'use client'

import { useFormContext } from 'react-hook-form'
import { FormField, FormItem, FormControl, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/buttons/Button'
import { Grip, Trash2 } from 'lucide-react'
import { QuestionItemProps } from '@/helpers/types/testPoll'

export function QuestionItem({ index, removeQuestion, dragHandleProps }: QuestionItemProps) {
  const { control } = useFormContext()

  return (
    <div className="space-y-2 p-4 border-none rounded-[6px] bg-white">
      <Grip color="gray" width={20} height={20} className="mx-auto cursor-grab outline-none" {...dragHandleProps} />
      <div className="flex items-center">
        <FormField
          control={control}
          name={`questions.${index}.question`}
          render={({ field }) => (
            <FormItem className="w-full border-b border-gray pb-4 flex items-center justify-between">
              <FormControl>
                <Input {...field} placeholder="Вопрос" className="w-[40vw]" />
              </FormControl>
              <Button type="button" onClick={() => removeQuestion(index)}>
                <Trash2 width={22} height={22} color="gray" className="mb-2" />
              </Button>
            </FormItem>
          )}
        />
      </div>
      <div className="mt-4">
        <span className="font-medium text-[14px]">Варианты ответа:</span>
        <div className="space-y-2 mt-2">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500" />
            <FormField
              control={control}
              name={`questions.${index}.correctAnswer`}
              render={({ field }) => (
                <FormItem className="flex items-center gap-2 w-full">
                  <FormLabel className="w-[20%]">Вариант правильный</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Текст" className="w-full" />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <FormField
              control={control}
              name={`questions.${index}.incorrectAnswer`}
              render={({ field }) => (
                <FormItem className="flex items-center gap-2 w-full">
                  <FormLabel className="w-[20%]">Вариант неправильный</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Текст" className="w-full" />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
