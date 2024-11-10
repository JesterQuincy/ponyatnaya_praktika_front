import { ICouple } from '@/types/couple'
import { DeepPartial } from '@/types/common'
import { axiosWithAuth } from '@/api/interceptors'

export const coupleService = {
  async updateCouple(data: DeepPartial<ICouple>): Promise<void> {
    return await axiosWithAuth.put('/api/pair', data)
  },
}
