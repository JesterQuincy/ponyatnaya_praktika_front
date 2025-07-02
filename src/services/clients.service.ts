import { axiosWithAuth } from '@/api/interceptors'
import { DeepPartial } from '@/types/common'
import { IClient, IGetClientsBySearch } from '@/types/clients'

export const clientService = {
  async getClientByName(
    limit: number = 100,
    offset: number = 0,
    customerName: string,
  ): Promise<{ data: IGetClientsBySearch[] }> {
    return await axiosWithAuth
      .get(`/api/v1/General/searchPersons/${offset}/${limit}`, {
        params: {
          customerName,
        },
      })
      .then((res) => res.data)
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
