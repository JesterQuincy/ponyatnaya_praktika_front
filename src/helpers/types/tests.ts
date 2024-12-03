import { ComponentType } from 'react'

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

export type AssessmentType = 'test' | 'survey' | 'form'

export interface ComponentMapping {
  Form: ComponentType
  ActionsPanel: ComponentType
}
