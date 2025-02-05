import { axiosWithAuth } from '@/api/interceptors'
import { IPhotoProjectiveMethod } from '@/types/methods/meetMethods'

export const photoMethodsService = {
  async getPhoto(id: number): Promise<any> {
    return await axiosWithAuth.get(`/api/innerOptions/photoMethods/get/${id}`)
  },

  async getMethodTypesPhoto({ typeMethodId, customerId }: { typeMethodId: number; customerId: number }) {
    const { data } = await axiosWithAuth.get<IPhotoProjectiveMethod[]>(
      `/api/innerOptions/projectiveMethods/getAllPhotos/${customerId}/${typeMethodId}`,
    )
    return data
  },
}
