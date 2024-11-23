import { useFieldArray, useFormContext } from 'react-hook-form'
import { FormField, FormItem, FormControl, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { SortableItem } from './SortableItem'
import { Grip, GripVertical, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/buttons/Button'
import { useState } from 'react'
import { QuestionItemProps } from '@/helpers/types/testPoll'

export function QuestionItem({ questionField, index, removeQuestion, dragHandleProps }: QuestionItemProps) {
  const { control, watch, setValue } = useFormContext()

  const sensors = useSensors(useSensor(PointerSensor))

  const [optionCounter, setOptionCounter] = useState(1)

  const {
    fields: optionFields,
    append: appendOption,
    remove: removeOption,
    move: moveOption,
  } = useFieldArray({
    control,
    name: `questions.${index}.options`,
  })

  const handleOptionDragEnd = (event: any) => {
    const { active, over } = event

    if (active.id !== over.id) {
      const oldIndex = optionFields.findIndex((field) => field.id === active.id)
      const newIndex = optionFields.findIndex((field) => field.id === over.id)

      moveOption(oldIndex, newIndex)
    }
  }

  const handleAddOption = () => {
    const newId = `variant${optionCounter}`
    appendOption({ id: newId, value: '' })
    setOptionCounter(optionCounter + 1)
  }

  const handleRemoveOption = (optionIndex: number) => {
    removeOption(optionIndex)
  }

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
              <FormMessage className="mb-2" />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={control}
        name={`questions.${index}.answerFormat`}
        render={({ field }) => (
          <FormItem className="flex items-center gap-2">
            <FormLabel className="min-w-[13%] mt-1 font-medium text-[14px]">Формат ответа:</FormLabel>
            <FormControl>
              <Select onValueChange={(value) => setValue(`questions.${index}.answerFormat`, value)} value={field.value}>
                <SelectTrigger className="border-gray rounded-[6px] w-[23%]">
                  <SelectValue placeholder="Формат ответа" />
                </SelectTrigger>
                <SelectContent className="border-gray bg-white rounded-[6px]">
                  <SelectItem value="Один из списка">Один из списка</SelectItem>
                  <SelectItem value="Несколько из списка">Несколько из списка</SelectItem>
                  <SelectItem value="Развёрнутый ответ">Развёрнутый ответ</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {watch(`questions.${index}.answerFormat`) !== 'Развёрнутый ответ' && (
        <div className="mt-4">
          <span className="font-medium text-[14px]">Варианты ответа:</span>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleOptionDragEnd}>
            <SortableContext items={optionFields.map((field) => field.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-1">
                {optionFields.map((optionField, optionIndex) => (
                  <SortableItem
                    key={optionField.id}
                    id={optionField.id}
                    fieldName={`questions.${index}.options.${optionIndex}.value`}
                    removeOption={() => handleRemoveOption(optionIndex)}
                    control={control}
                    label={`Вариант ${optionIndex + 1}`}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
          <Button type="button" onClick={handleAddOption} className="flex items-center mt-2">
            <Plus width={15} height={15} color="#5A5A5A" className="mr-1 font-black" />
            <span className="text-[#282728] text-[13px] font-medium underline underline-offset-2">
              Добавить вариант
            </span>
          </Button>
        </div>
      )}
    </div>
  )
}
