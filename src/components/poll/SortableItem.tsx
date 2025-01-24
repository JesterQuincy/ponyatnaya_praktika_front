import { Button } from '@/components/ui/buttons/Button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { SortableItemProps } from '@/helpers/types/testPoll'
import variantTrash from '@/public/icon/variantTrash.svg'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'
import Image from 'next/image'

export function SortableItem({ id, fieldName, removeOption, control, label }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div ref={setNodeRef} style={style}>
      <FormField
        control={control}
        name={fieldName}
        render={({ field }) => (
          <FormItem className="flex items-center gap-4">
            <div className="flex gap-1 items-center mt-2 mr-4 cursor-grab" {...attributes} {...listeners}>
              <GripVertical color="gray" width={15} height={15} className="mb-1" />
              <FormLabel className="font-medium text-[13px]">{label}</FormLabel>
            </div>
            <FormControl>
              <Input {...field} placeholder="Текст" />
            </FormControl>
            <FormMessage />
            <Button type="button" onClick={removeOption}>
              <Image alt="variantTrash" src={variantTrash} width={29} height={29} color="gray" className="mb-1" />
            </Button>
          </FormItem>
        )}
      />
    </div>
  )
}
