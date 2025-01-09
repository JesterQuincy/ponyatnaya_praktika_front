import { SortableQuestionItemProps } from '@/helpers/types/testPoll'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { QuestionItem } from './QuestionItem'

export function SortableQuestionItem({ id, questionField, index, removeQuestion }: SortableQuestionItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div ref={setNodeRef} style={style}>
      <QuestionItem
        questionField={questionField}
        index={index}
        removeQuestion={removeQuestion}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </div>
  )
}
