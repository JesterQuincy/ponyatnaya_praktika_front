import { Button } from '@/components/ui/buttons/Button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { TestPollSchema, TestPollSchemaType } from '@/models/testPollSchema'
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { SortableQuestionItem } from './SortableQuestionItem'
import { Textarea } from '../ui/textarea'
import Image from 'next/image'
import addQuestion from '@/public/icon/addQuestion.svg'
import { useCreateQuestionnaire } from '@/api/hooks/therapistQuestionnaires/useCreateQuestionnaire'

type PollFormProps = {
  type: string
  name: string
}

export function PollForm({ type, name }: PollFormProps) {
  const isTest = type === 'test'
  const createQuestionnaire = useCreateQuestionnaire()
  const form = useForm<TestPollSchemaType>({
    resolver: zodResolver(TestPollSchema),
    defaultValues: {
      description: '',
      questions: [
        {
          id: 0,
          text: '',
          type: 'Один из списка',
          answerOptions: [{ id: 0, text: '', correct: false }],
        },
      ],
    },
  })

  const { control, handleSubmit } = form

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
    }
  }

  const handleAddQuestion = () => {
    appendQuestion({
      id: 0,
      text: '',
      type: 'Один из списка',
      answerOptions: [{ id: 0, text: '', correct: false }],
    })
  }

  const onSubmit = handleSubmit((data) => {
    const payload = {
      title: name,
      description: data.description,
      dateCreated: new Date().toISOString().split('T')[0],
      questions: data.questions.map((question) => ({
        id: question.id,
        text: question.text,
        type: question.type,
        answerOptions: question.answerOptions.map((option) => ({
          id: option.id,
          text: option.text,
          correct: option.correct,
        })),
      })),
      test: isTest,
    }

    createQuestionnaire.mutate(payload)
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="flex justify-between items-start mt-5 gap-5">
          <div className="w-2/3 bg-grey rounded-[5px] py-3 px-4">
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleQuestionDragEnd}>
              <SortableContext items={questionFields.map((field) => field.id)} strategy={verticalListSortingStrategy}>
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
            <Button type="button" onClick={handleAddQuestion} className="flex items-center gap-1 mt-2">
              <Image src={addQuestion} width={14} height={14} alt="addQuestion" />
              <span className="text-[14px] font-medium underline underline-offset-2">Добавить вопрос</span>
            </Button>
          </div>
          <div className="w-1/3 bg-grey rounded-[5px] py-3 px-4">
            <Button type="submit" className="py-1.5 px-5 bg-taupe text-white rounded-[6px] w-[50%]">
              Сохранить
            </Button>
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
                        className="border-gray rounded-[6px] max-h-[25vh] h-[15vh]"
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
