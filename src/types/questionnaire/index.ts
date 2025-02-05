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
  description?: string
  dateCreated: string
  questions: IQuestion[]
  test: boolean
}

export interface IQuestionnaireResult {
  questionnaireId: number
  clientChoices: IChoice[]
  dateResult: string
}

interface IChoice {
  answerOptionId: number
  text?: string
}

export interface IQuestionnairesResultResponse {
  data: IQuestionnairesResultData[]
  total: number
}

export interface IQuestionnairesResultData {
  resultId: number
  questionnaireId: number
  questionnaireTitle: string
  dateResult: string
  test: true
}

export interface IQuestionnaireResultResponse {
  id: number
  customerName: string
  questionnaire: QuestionnaireResult
  dateResult: string
}

interface QuestionnaireResult {
  id: number
  title: string
  description: string
  dateCreated: string
  questions: IQuestions[]
  test: true
}

export interface IQuestions {
  id: number
  type: string
  text: string
  answerOptions: Array<IAnswerOption & { choice: boolean }>
}
