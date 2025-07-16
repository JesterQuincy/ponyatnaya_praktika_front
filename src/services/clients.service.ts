import { axiosWithAuth } from '@/api/interceptors'
import { DeepPartial } from '@/types/common'
import { IClient, IGetClientBySearchRequest, TGetClientsBySearchResponse } from '@/types/clients'

export const clientService = {
  async getClients({ params, queryBody }: IGetClientBySearchRequest) {
    const { limit, offset } = params

    return await axiosWithAuth
      .get<TGetClientsBySearchResponse>(`/api/v1/General/searchPersons/${offset}/${limit}`, {
        params: {
          customerName: queryBody?.customerName,
          orderDate: queryBody?.orderDate,
          orderMeetCount: queryBody?.orderMeetCount,
          clientType: queryBody?.clientType,
          clientStatus: queryBody?.clientStatus,
          meetingFormat: queryBody?.meetingFormat,
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
