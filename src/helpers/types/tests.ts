import { ComponentType } from 'react'

export enum ETestType {
  test = 'Тест',
  survey = 'Опрос',
  form = 'Анкета',
}

export interface ITestCardProps {
  test: boolean
  title: string
  dateCreated: string
}

export type AssessmentType = 'test' | 'survey' | 'form'

export interface ComponentMapping {
  Form: ComponentType
  ActionsPanel: ComponentType
}
