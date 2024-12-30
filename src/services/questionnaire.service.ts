import { axiosWithAuth } from '@/api/interceptors'

export interface AnswerOption {
  id: number
  text: string
  correct: boolean
}

export interface Question {
  id: number
  type: string
  text: string
  answerOptions: AnswerOption[]
}

export interface QuestionnaireRequest {
  id?: number
  title: string
  description: string
  dateCreated: string
  questions: Question[]
  test: boolean
}

export const questionnaireService = {
  async createQuestionnaire(data: QuestionnaireRequest): Promise<void> {
    return await axiosWithAuth.post('/api/questionnaire/create', data)
  },
}
