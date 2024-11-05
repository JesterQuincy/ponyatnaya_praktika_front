export enum ETestType {
  test = 'Тест',
  survey = 'Опрос',
  form = 'Анкета',
}

export interface ITestCardProps {
  type: 'test' | 'survey' | 'form'
  title: string
  date: string
}