import { axiosWithAuth } from '@/api/interceptors'
import { Questionnaire } from '@/types/questionnaire'

export const questionnaireService = {
  async getQuestionnaires(offset: number, limit: number = 5): Promise<{ data: Questionnaire[] }> {
    return await axiosWithAuth.get(`/api/questionnaire/get/byUser/${offset}/${limit}`)
  },
}
