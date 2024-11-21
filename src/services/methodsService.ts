import { axiosWithAuth } from '@/api/interceptors'
import { TMethodsArray } from '@/types/methods'
import { IMeetProjMethod } from '@/types/methods/meetMethods'

export const methodsService = {
  async getAllTypes(): Promise<{ data: TMethodsArray }> {
    return await axiosWithAuth.get('/api/innerOptions/typeMethod/getAllTypes')
  },

  async getMeetProjMethods(meetId: number): Promise<{ data: IMeetProjMethod[] }> {
    return await axiosWithAuth.get(`/api/v1/General/projMethods/${meetId}`)
  },
}
