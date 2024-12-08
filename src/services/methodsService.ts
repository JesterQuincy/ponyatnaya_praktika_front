import { axiosWithAuth } from '@/api/interceptors'
import { IMethodic, TMethodsArray } from '@/types/methods'
import { IMeetProjMethod, IProjectiveMethod } from '@/types/methods/meetMethods'
import { DeepPartial, TPromiseNumber } from '@/types/common'

export const methodsService = {
  async getAllTypes(): Promise<{ data: TMethodsArray }> {
    return await axiosWithAuth.get('/api/innerOptions/typeMethod/getAllTypes')
  },

  async getMethodById(id: number): Promise<{ data: IProjectiveMethod }> {
    return await axiosWithAuth.get(`/api/innerOptions/projectiveMethods/get/${id}`)
  },

  async createType(data: DeepPartial<IMethodic>): TPromiseNumber {
    return await axiosWithAuth.post('/api/innerOptions/typeMethod', data)
  },

  async createProjMethod(data: DeepPartial<IMeetProjMethod>): TPromiseNumber {
    return await axiosWithAuth.post('/api/innerOptions/projectiveMethods', data)
  },

  async updateProjMethod(data: DeepPartial<IMeetProjMethod>): TPromiseNumber {
    return await axiosWithAuth.put('/api/innerOptions/projectiveMethods', data)
  },

  async deleteProjMethod(id: number) {
    return await axiosWithAuth.delete(`/api/innerOptions/projectiveMethods/delete/${id}`)
  },

  async getMeetProjMethods(meetId: number): Promise<{ data: IMeetProjMethod[] }> {
    return await axiosWithAuth.get(`/api/innerOptions/projectiveMethods/byMeet/${meetId}`)
  },
}
