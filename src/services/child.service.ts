import { axiosWithAuth } from '@/api/interceptors'
import { IChild } from '@/types/child'
import { DeepPartial } from '@/types/common'

export const childService = {
  async updateChild(data: DeepPartial<IChild>): Promise<void> {
    return await axiosWithAuth.put('/api/child', data)
  },
}
