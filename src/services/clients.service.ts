import { axiosWithAuth } from '@/api/interceptors'
import { DeepPartial } from '@/types/common'
import { IClient } from '@/types/clients'

export const clientService = {
  async getClientByName(limit: number, offset: number, personName: string): Promise<any> {
    return await axiosWithAuth.get(`/api/v1/General/searchPersons/0/100`)
  },
  async getClientById(id: number): Promise<any> {
    return await axiosWithAuth.get(`/api/customer/get/${id}`)
  },
  async getChildById(id: number): Promise<any> {
    return await axiosWithAuth.get(`/api/child/get/${id}`)
  },
  async getPairById(id: number): Promise<any> {
    return await axiosWithAuth.get(`/api/pair/get/${id}`)
  },

  async getUserMeets(limit: number, offset: number, customerId: number): Promise<any> {
    return await axiosWithAuth.get(`/api/v1/General/searchMeet/${customerId}/${offset}/${limit}`)
  },

  async updateUser(data: DeepPartial<IClient>): Promise<void> {
    return await axiosWithAuth.put('/api/customer', data)
  },
}
