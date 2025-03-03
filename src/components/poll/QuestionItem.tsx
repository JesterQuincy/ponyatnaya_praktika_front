import { useFieldArray, useFormContext } from 'react-hook-form'
import { FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { SortableItem } from './SortableItem'
import { Grip, Plus } from 'lucide-react'
import { Button } from '@/components/ui/buttons/Button'
import { QuestionItemProps } from '@/helpers/types/testPoll'
import Image from 'next/image'
import variantTrash from '@/public/icon/variantTrash.svg'

export function QuestionItem({ index, removeQuestion, dragHandleProps }: QuestionItemProps) {
  const { control, watch, setValue } = useFormContext()

  const sensors = useSensors(useSensor(PointerSensor))

  const {
    fields: optionFields,
    append: appendOption,
    remove: removeOption,
    move: moveOption,
  } = useFieldArray({
    control,
    name: `questions.${index}.answerOptions`,
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
    appendOption({ id: 0, text: '', correct: false })
  }

  return (
    <div className="space-y-2 p-4 border-none rounded-[6px] bg-white">
      <Grip color="gray" width={20} height={20} className="mx-auto cursor-grab outline-none" {...dragHandleProps} />
      <div className="flex gap-2">
        <FormField
          control={control}
          name={`questions.${index}.text`}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input {...field} placeholder="Вопрос" className="w-full" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="button" onClick={() => removeQuestion(index)} className="">
          <Image alt="variantTrash" src={variantTrash} width={29} height={29} color="gray" className="mb-1" />
        </Button>
      </div>

      <FormField
        control={control}
        name={`questions.${index}.type`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="flex gap-2">
                <h1 className="text-[14px] w-fit my-auto">Формат ответа:</h1>
                <Select value={field.value} onValueChange={(value) => setValue(`questions.${index}.type`, value)}>
                  <SelectTrigger className="border-gray rounded-[6px] w-fit">
                    <SelectValue placeholder="Выберите формат ответа" />
                  </SelectTrigger>
                  <SelectContent className="border-gray bg-white rounded-[6px]">
                    <SelectItem value="Один из списка">Один из списка</SelectItem>
                    <SelectItem value="Несколько из списка">Несколько из списка</SelectItem>
                    <SelectItem value="Развернутый ответ">Развернутый ответ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {watch(`questions.${index}.type`) !== 'Развернутый ответ' && (
        <div className="mt-2">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleOptionDragEnd}>
            <SortableContext items={optionFields.map((field) => field.id)} strategy={verticalListSortingStrategy}>
              {optionFields.map((optionField, optionIndex) => (
                <SortableItem
                  key={optionField.id}
                  id={optionField.id}
                  label={`Вариант ${optionIndex + 1}`}
                  fieldName={`questions.${index}.answerOptions.${optionIndex}.text`}
                  removeOption={() => removeOption(optionIndex)}
                  control={control}
                />
              ))}
            </SortableContext>
          </DndContext>
          <Button
            type="button"
            onClick={handleAddOption}
            className="flex justify-center items-center text-[12px] underline mt-4">
            <Plus size={14} /> Добавить вариант
          </Button>
        </div>
      )}
    </div>
  )
}
