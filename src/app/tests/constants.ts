import { ISort } from '@/app/tests/page'

export const initialSortValue: ISort = {
  type: { value: 'Тест', label: 'Тест' },
  date: { value: 'Раньше', label: 'Раньше' },
}

export const typeOption = [
  {
    value: 'Тест',
    label: 'Тест',
  },
  {
    value: 'Опрос',
    label: 'Опрос',
  },
]

export const dateOption = [
  {
    value: 'Раньше',
    label: 'Раньше',
  },
  {
    value: 'Позже',
    label: 'Позже',
  },
]

export const cardData = [
  {
    id: 1,
    title: 'Тест по завершению терапии',
    type: 'test',
    date: '20.12.2024',
  },
  {
    id: 2,
    title: 'Опрос по завершению терапии',
    type: 'survey',
    date: '20.12.2024',
  },
  {
    id: 3,
    title: 'Тест промежуточный результат',
    type: 'test',
    date: '20.12.2024',
  },
  {
    id: 4,
    title: 'Опрос промежуточный результат',
    type: 'survey',
    date: '20.12.2024',
  },
  {
    id: 5,
    title: 'Анкета определения мотивации',
    type: 'form',
    date: '20.12.2024',
  },
]
