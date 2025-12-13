import { axiosClassic, axiosWithAuth } from '@/api/interceptors'
import { DeepPartial } from '@/types/common'
import { IClient } from '@/types/clients'
import { IChild } from '@/types/child'
import { ICouple } from '@/types/couple'

export const profileLinkService = {
  async updateCustomerLink(data: DeepPartial<IClient>, token: string): Promise<void> {
    return await axiosClassic.put(`/api/applicationForm/update/CUSTOMER`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
  },
  async updateChildLink(data: DeepPartial<IChild>, token: string): Promise<void> {
    return await axiosClassic.put(`/api/applicationForm/update/CHILD`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
  },
  async updateCoupleLink(data: DeepPartial<ICouple>, token: string): Promise<void> {
    return await axiosClassic.put(`/api/applicationForm/update/PAIR`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
  },

  async getLink(id: string): Promise<{ data: string }> {
    return await axiosWithAuth.get(`/api/applicationForm/get/${id}`)
  },

  async getFormCustomer(token: string) {
    const { data } = await axiosClassic.get<IClient>('/api/applicationForm/get/CUSTOMER', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return data
  },

  async getFormChild(token: string) {
    const { data } = await axiosClassic.get<IChild>('/api/applicationForm/get/CHILD', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return data
  },

  async getFormCouple(token: string) {
    const { data } = await axiosClassic.get<ICouple>('/api/applicationForm/get/PAIR', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return data
  },
}
