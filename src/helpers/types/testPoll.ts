export interface QuestionItemProps {
  questionField: any
  index: number
  removeQuestion: (index: number) => void
  dragHandleProps?: any
}

export interface SortableItemProps {
  id: string
  fieldName: string
  removeOption: () => void
  control: any
  label: string
}

export interface SortableQuestionItemProps {
  id: string
  questionField: any
  index: number
  removeQuestion: (index: number) => void
}
