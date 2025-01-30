export interface IQuestionnaire {
  id: number
  title: string
  dateCreated: string
  test: boolean
}

export interface IQuestionnaireResponse {
  data: IQuestionnaire[]
  total: number
}

export interface IAnswerOption {
  id?: number
  text?: string
  correct: boolean
}

export interface IQuestion {
  id?: number
  type?: 'Один из списка' | 'Несколько из списка' | 'Развернутый ответ'
  text: string
  answerOptions: IAnswerOption[]
}

export interface IQuestionnaireRequest {
  id?: number
  title: string
  description: string
  dateCreated: string
  questions: IQuestion[]
  test: boolean
}

export interface IQuestionnaireResult {
  questionnaireId: number
  clientChoices: IChoice[]
}

interface IChoice {
  answerOptionId: number
  text?: string
}
