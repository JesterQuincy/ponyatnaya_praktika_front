import { axiosWithAuth } from '@/api/interceptors'
import { DeepPartial } from '@/types/common'
import { IClient } from '@/types/clients'
import { IChild } from '@/types/child'
import { ICouple } from '@/types/couple'

export const profileLinkService = {
  async updateCustomerLink(data: DeepPartial<IClient>): Promise<void> {
    return await axiosWithAuth.put(`/api/applicationForm/update/CUSTOMER`, data)
  },
  async updateChildLink(data: DeepPartial<IChild>): Promise<void> {
    return await axiosWithAuth.put(`/api/applicationForm/update/CHILD`, data)
  },
  async updateCoupleLink(data: DeepPartial<ICouple>): Promise<void> {
    return await axiosWithAuth.put(`/api/applicationForm/update/PAIR`, data)
  },
  async getLink(id: string | null): Promise<{ data: string }> {
    return await axiosWithAuth.get(`/api/applicationForm/get/${id}`)
  },
}
