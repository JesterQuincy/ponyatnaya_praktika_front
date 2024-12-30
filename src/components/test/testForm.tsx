import { Button } from '@/components/ui/buttons/Button'
import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'

import addQuestion from '@/public/icon/addQuestion.svg'
import Image from 'next/image'
import { SortableQuestionItem } from './SortableQuestionItem'

import { TestSchema, TestSchemaType } from '@/models/testSchema'
import { closestCenter, DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Textarea } from '../ui/textarea'

type TestFormProps = {
  type: string // Тип (test или survey)
  name: string // Название теста/опроса
}

export function TestForm({ type, name }: TestFormProps) {
  const form = useForm<TestSchemaType>({
    resolver: zodResolver(TestSchema),
    defaultValues: {
      title: name,
      description: '',
      questions: [
        {
          type: 'single', // Пример типа вопроса
          text: '',
          answerOptions: [
            { text: '', correct: true },
            { text: '', correct: false },
          ],
        },
      ],
      test: type === 'test',
    },
  })

  const { control, handleSubmit, watch } = form

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

  const onSubmit = handleSubmit((data) => {
    const payload = {
      ...data,
      dateCreated: new Date().toISOString().split('T')[0],
    }

    console.log('Данные для отправки:', payload)
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-3">
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
            <Button
              type="button"
              onClick={() =>
                appendQuestion({
                  type: 'single',
                  text: '',
                  answerOptions: [
                    { text: '', correct: true },
                    { text: '', correct: false },
                  ],
                })
              }
              className="flex items-center gap-1">
              <Image src={addQuestion} width={14} height={14} alt="addQuestion" />
              <span className="text-[14px] font-medium underline underline-offset-2">Добавить вопрос</span>
            </Button>
          </div>
          <div className="w-1/3 bg-grey rounded-[5px] py-3 px-4">
            <div className="flex flex-col gap-2 max-h-[500px]">
              {/* Кнопка с правильным типом */}
              <button type="submit" className="py-1.5 px-5 bg-taupe text-white rounded-[6px] w-[50%]">
                Сохранить
              </button>
              <div className="mt-7">
                <h1 className="text-xl font-semibold">Заметка к материалу</h1>
                <Textarea
                  className="border-gray rounded-[6px] max-h-[25vh] h-[15vh]"
                  placeholder={`Этот ${type === 'test' ? 'тест' : 'опрос'} создан специально для клиента.`}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  )
}
