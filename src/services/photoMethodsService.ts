import { axiosWithAuth } from '@/api/interceptors'
import { DeepPartial, IMutateResponse } from '@/types/common'
import { IPhotoProjectiveMethod } from '@/types/methods/photo'

export const photoMethodsService = {
  async createPhoto(data: DeepPartial<IPhotoProjectiveMethod>): Promise<IMutateResponse> {
    return await axiosWithAuth.post('/api/innerOptions/photoMethods', data)
  },

  async updatePhoto(data: DeepPartial<IPhotoProjectiveMethod>): Promise<IMutateResponse> {
    return await axiosWithAuth.put('/api/innerOptions/photoMethods', data)
  },

  async deletePhoto(id: number): Promise<any> {
    return await axiosWithAuth.delete(`/api/innerOptions/photoMethods/delete/${id}`)
  },

  async getPhoto(id: number): Promise<any> {
    return await axiosWithAuth.get(`/api/innerOptions/photoMethods/get/${id}`)
  },
}
