import { Button } from '@/components/ui/buttons/Button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'

import addQuestion from '@/public/icon/addQuestion.svg'
import Image from 'next/image'
import { SortableQuestionItem } from './SortableQuestionItem'

import { TestSchema, TestSchemaType } from '@/models/testSchema'
import { closestCenter, DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Textarea } from '../ui/textarea'
import { useCreateQuestionnaire } from '@/api/hooks/therapistQuestionnaires/useCreateQuestionnaire'
import { useRouter, useSearchParams } from 'next/navigation'
import { useGetQuestionnaire } from '@/api/hooks/therapistQuestionnaires/useGetQuestionnaire'
import { useEffect } from 'react'
import { IQuestionnaireRequest } from '@/types/questionnaire'
import { Input } from '@/components/ui/input'
import { useUpdateQuestionnaire } from '@/api/hooks/therapistQuestionnaires/useUpdateQuestionnaire'

type TestFormProps = {
  type: string // Тип (test или survey)
  name: string // Название теста/опроса
}

export function TestForm({ name }: TestFormProps) {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const router = useRouter()

  const { data: questionnaire } = useGetQuestionnaire(id)
  const createQuestionnaire = useCreateQuestionnaire()
  const updateQuestionnaire = useUpdateQuestionnaire()

  const form = useForm<TestSchemaType>({
    resolver: zodResolver(TestSchema),
    defaultValues: {
      title: questionnaire?.title || name,
      description: questionnaire?.description || '',
      test: questionnaire?.test || true,
      questions: questionnaire?.questions?.map((q, index) => ({
        ...q,
        id: q.id ?? index,
      })) || [
        {
          id: 0,
          text: '',
          order: 1,
          answerOptions: [
            { text: '', correct: true, id: 0 },
            { text: '', correct: false, id: 0 },
          ],
        },
      ],
    },
  })

  const { control, handleSubmit, reset } = form

  useEffect(() => {
    if (questionnaire) {
      reset({
        title: questionnaire?.title,
        description: questionnaire?.description,
        questions:
          questionnaire?.questions?.map((q, index) => ({
            ...q,
            id: q.id ?? index,
          })) || [],
        test: questionnaire?.test,
      })
    }
  }, [questionnaire, reset])

  const {
    fields: questionFields,
    append: appendQuestion,
    remove: removeQuestion,
    move: moveQuestion,
  } = useFieldArray({
    control,
    name: 'questions',
  })

  const sensors = useSensors(useSensor(PointerSensor))

  const handleQuestionDragEnd = (event: any) => {
    const { active, over } = event

    if (active.id !== over.id) {
      const oldIndex = questionFields.findIndex((field) => field.id === active.id)
      const newIndex = questionFields.findIndex((field) => field.id === over.id)

      moveQuestion(oldIndex, newIndex)

      questionFields.forEach((_, index) => {
        form.setValue(`questions.${index}.order`, index + 1) // Проставляем новый order
      })
    }
  }

  const onSubmit = handleSubmit(async (data) => {
    const isUpdating = Boolean(id && questionnaire)

    const payload: IQuestionnaireRequest = {
      ...(isUpdating && { id: Number(id) }),
      title: data.title,
      description: data.description,
      dateCreated: new Date().toISOString().split('T')[0],
      questions: data.questions
        .map((q, index) => ({
          ...(isUpdating && { id: Number(data.questions[index].id) }),
          text: q.text,
          order: index + 1,
          answerOptions: q.answerOptions.map((o, i) => ({
            text: o.text,
            correct: o.correct,
            ...(isUpdating && { id: q.answerOptions[i].id }),
          })),
          type: 'Один из списка' as const,
        }))
        .sort((a, b) => a.order - b.order),
      test: data.test,
    }

    try {
      if (isUpdating) {
        await updateQuestionnaire.mutateAsync(payload) // Обновление
      } else {
        await createQuestionnaire.mutateAsync(payload) // Создание
      }

      router.push('/tests')
    } catch {}
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} key={questionnaire?.id} className="space-y-3">
        <FormField
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder={'Введите название'} className="w-fit" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          name={'title'}
          control={control}
        />
        <div className="flex justify-between items-start mt-5 gap-5">
          <div className="w-2/3 bg-grey rounded-[5px] py-3 px-4">
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleQuestionDragEnd}>
              <SortableContext
                key={questionFields.length}
                items={questionFields.map((field) => field.id)}
                strategy={verticalListSortingStrategy}>
                {questionFields.map((questionField, index) => (
                  <SortableQuestionItem
                    key={questionField.id}
                    id={questionField.id}
                    questionField={questionField}
                    index={index}
                    removeQuestion={removeQuestion}
                  />
                ))}
              </SortableContext>
            </DndContext>
            <Button
              type="button"
              onClick={() =>
                appendQuestion({
                  id: 0,
                  text: '',
                  order: questionFields.length + 1,
                  answerOptions: [
                    { text: '', correct: true, id: 0 },
                    { text: '', correct: false, id: 0 },
                  ],
                })
              }
              className="flex items-center gap-1">
              <Image src={addQuestion} width={14} height={14} alt="addQuestion" />
              <span className="text-[14px] font-medium underline underline-offset-2">Добавить вопрос</span>
            </Button>
          </div>
          <div className="w-1/3 bg-grey rounded-[5px] py-3 px-4">
            {/* Кнопка с правильным типом */}
            <button type="submit" className="py-1.5 px-5 bg-taupe text-white rounded-[6px] w-[50%] mb-4">
              Сохранить
            </button>
            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <>
                      <h1 className="text-xl font-semibold">Заметка к материалу</h1>
                      <Textarea
                        {...field}
                        className="border-gray rounded-[6px] min-h-[15vh] max-h-[50vh]"
                        placeholder={`Этот опрос создан специально для клиента: 
${'\n'}Продолжить разбираться в истории Анны и выявить возможные триггеры ее тревоги.
${'\n'}Использовать методы релаксации (например, `}
                      />
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  )
}
