import { axiosWithAuth } from '@/api/interceptors'
import { IMeetingDetails } from '@/types/meet/getMeetById'
import { DeepPartial } from '@/types/common'
import { IGetCustomerInfoByMeet } from '@/types/meet/getCustomerInfoByMeet'

export const meetingService = {
  async getMeetingById(id: number | string): Promise<{ data: IMeetingDetails }> {
    return await axiosWithAuth.get(`/api/meet/get/${String(id)}`)
  },

  async updateMeeting(data: DeepPartial<IMeetingDetails>): Promise<void> {
    return await axiosWithAuth.put('/api/meet', data)
  },

  async getMeetingCustomerInfo(id: string): Promise<{ data: IGetCustomerInfoByMeet }> {
    return await axiosWithAuth.get(`/api/meet/customerInfo/${id}`)
  },

  async createMeetingId(data: any): Promise<any> {
    await axiosWithAuth.post('meet/', data)
  },
  async deleteMeeting(id: number): Promise<any> {
    await axiosWithAuth.delete(`meet/delete/${id}`)
  },
}
