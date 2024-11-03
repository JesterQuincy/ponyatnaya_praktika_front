'use client'
import QuestionnaireCard from '@/components/QuestionnaireCard'
import { surveySchema } from '@/models/pollSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Form, FormField, FormItem, FormControl, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { COLOR_OPTIONS } from '@/helpers/constants'
import { Input } from '@/components/ui/input'

export default function PollPage() {
  const form = useForm<z.infer<typeof surveySchema>>({
    resolver: zodResolver(surveySchema),
    defaultValues: {
      priority: '',
      favoriteColors: [],
      stressManagement: '',
      support: '',
      sessionsSatisfaction: '',
    },
  })

  const [showCustomInput, setShowCustomInput] = useState(false)

  const onSubmit = (data: z.infer<typeof surveySchema>) => {
    console.log(data)
  }
  return (
    <div className="flex justify-center items-center h-screen my-auto">
      <QuestionnaireCard title="Опрос по завершении терапии">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            {/* Вопрос 1 */}
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-[18px]">1. Вам ясны приоритеты и цели терапии?</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} value={field.value}>
                      <div className="flex items-center space-x-2 mt-2">
                        <RadioGroupItem value="yes" id="priorityYes" />
                        <label htmlFor="priorityYes">Да</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="priorityNo" />
                        <label htmlFor="priorityNo">Нет</label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* Вопрос 2 */}
            <FormField
              control={form.control}
              name="favoriteColors"
              render={() => (
                <FormItem>
                  <FormLabel className="font-bold text-[18px]">2. Ваши любимые цвета</FormLabel>
                  <div className="mt-2">
                    {COLOR_OPTIONS.map((color) => (
                      <FormField
                        key={color.id}
                        control={form.control}
                        name="favoriteColors"
                        render={({ field }) => (
                          <FormItem key={color.id} className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox
                                id={color.id}
                                checked={field.value.includes(color.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, color.id])
                                    : field.onChange(field.value.filter((v) => v !== color.id))
                                }}
                                className="mt-2"
                              />
                            </FormControl>
                            <label htmlFor={color.id}>{color.label}</label>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* Вопрос 3 */}
            <FormField
              control={form.control}
              name="stressManagement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-[18px]">3. Вы умеете справляться со стрессом?</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} value={field.value}>
                      <div className="flex items-center space-x-2 mt-2">
                        <RadioGroupItem value="yes" id="stressYes" />
                        <label htmlFor="stressYes">Да</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="stressNo" />
                        <label htmlFor="stressNo">Нет</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="not_sure" id="stressNotSure" />
                        <label htmlFor="stressNotSure">Не знаю</label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* Вопрос 4 */}
            <FormField
              control={form.control}
              name="support"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-[18px]">4. Вы знаете что вас поддерживает?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => {
                        setShowCustomInput(value === 'custom')
                        field.onChange(value === 'custom' ? '' : value)
                      }}
                      value={showCustomInput ? 'custom' : field.value}>
                      <div className="flex items-center space-x-2 mt-2">
                        <RadioGroupItem value="yes" id="supportYes" />
                        <label htmlFor="supportYes">Да</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="supportNo" />
                        <label htmlFor="supportNo">Нет</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="custom" id="supportCustom" />
                        <label htmlFor="supportCustom">Мой вариант</label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  {showCustomInput && (
                    <FormItem className="mt-2">
                      <FormControl>
                        <Input
                          placeholder="Введите свой вариант ответа"
                          value={field.value}
                          onChange={(e) => field.onChange(e.target.value)}
                          className="bg-white w-[20%] rounded-[6px]"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                </FormItem>
              )}
            />

            {/* Вопрос 5 */}
            <FormField
              control={form.control}
              name="sessionsSatisfaction"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-[18px]">5. Довольны ли вы состоявшимися сессиями?</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} value={field.value}>
                      <div className="flex items-center space-x-2 mt-2">
                        <RadioGroupItem value="yes" id="satisfactionYes" />
                        <label htmlFor="satisfactionYes">Да</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="satisfactionNo" />
                        <label htmlFor="satisfactionNo">Нет</label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="mt-4 bg-taupe w-[15%] text-white hover:bg-taupe/80 rounded-[6px]"
              disabled={!form.formState.isValid}>
              Отправить
            </Button>
          </form>
        </Form>
      </QuestionnaireCard>
    </div>
  )
}
