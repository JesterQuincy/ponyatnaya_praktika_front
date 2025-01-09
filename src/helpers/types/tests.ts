import { ComponentType } from 'react'

export enum ETestType {
  test = 'Тест',
  survey = 'Опрос',
}

export interface ITestCardProps {
  test: boolean
  title: string
  dateCreated: string
}

export type AssessmentType = 'test' | 'survey'

export interface AssessmentComponentProps {
  type: string
  name: string
}

export interface ComponentMapping {
  Form: ComponentType<AssessmentComponentProps>
  ActionsPanel?: ComponentType<AssessmentComponentProps>
}
