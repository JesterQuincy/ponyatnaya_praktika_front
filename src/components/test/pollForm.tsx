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

export function TestForm() {
  const form = useForm<TestSchemaType>({
    resolver: zodResolver(TestSchema),
    defaultValues: {
      questions: [
        {
          question: '',
          correctAnswer: '',
          incorrectAnswer: '',
        },
      ],
    },
  })

  const { control } = form

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

  const onSubmit = form.handleSubmit((data) => {
    console.log(data)
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-3">
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
              question: '',
              correctAnswer: '',
              incorrectAnswer: '',
            })
          }
          className="flex items-center gap-1">
          <Image src={addQuestion} width={14} height={14} alt="addQuestion" />
          <span className="text-[14px] font-medium underline underline-offset-2">Добавить вопрос</span>
        </Button>
        <Button className="py-1.5 px-5 bg-taupe text-white rounded-[6px]" type="submit">
          Сохранить
        </Button>
      </form>
    </Form>
  )
}
