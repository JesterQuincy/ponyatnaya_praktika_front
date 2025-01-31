import { axiosClassic, axiosWithAuth } from '@/api/interceptors'
import { IQuestionnaireRequest, IQuestionnaireResponse, IQuestionnaireResult } from '@/types/questionnaire'

export const questionnaireService = {
  async getQuestionnaires({
    offset,
    limit = 5,
    orderIsTest,
    orderDate,
  }: {
    offset: number
    limit?: number
    orderIsTest?: 'asc' | 'desc'
    orderDate?: 'desc' | 'asc'
  }) {
    return await axiosWithAuth.get<IQuestionnaireResponse>(`/api/questionnaire/get/byUser/${offset}/${limit}`, {
      params: { orderDate, orderIsTest },
    })
  },

  async createQuestionnaire(data: IQuestionnaireRequest) {
    return await axiosWithAuth.post<number>('/api/questionnaire/create', data)
  },

  async getQuestionnaireById(id: string | null, token?: string | null) {
    if (token) {
      const { data } = await axiosClassic.get<IQuestionnaireRequest>(`/api/questionnaire/get/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      return data
    }

    const { data } = await axiosWithAuth.get<IQuestionnaireRequest>(`/api/questionnaire/get/${id}`)
    return data
  },

  async getQuestionnaireLink({ customerId, questionnaireId }: { customerId: number; questionnaireId: number }) {
    const { data } = await axiosWithAuth.get<string>(`/api/questionnaire/get/link/${customerId}/${questionnaireId}`)
    return data
  },

  async deleteQuestionnaire(id: number) {
    return await axiosWithAuth.delete(`/api/questionnaire/delete/${id}`)
  },

  async saveQuestionnaireResult(data: IQuestionnaireResult, token: string) {
    return await axiosClassic.post('/api/questionnaire/create/result', data, {
      headers: { Authorization: `Bearer ${token}` },
    })
  },
}
