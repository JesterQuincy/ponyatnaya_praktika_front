import { axiosWithAuth } from '@/api/interceptors'
import { IMeetingDetails } from '@/types/meet/getMeetById'
import { DeepPartial } from '@/types/common'
import { IGetCustomerInfoByMeet } from '@/types/meet/getCustomerInfoByMeet'
import { ICreateMeeting } from '@/helpers/types/calendar'

export const meetingService = {
  async getMeetingById(id: number | string) {
    return await axiosWithAuth.get<IMeetingDetails>(`/api/meet/get/${String(id)}`)
  },

  async updateMeeting(data: DeepPartial<IMeetingDetails>) {
    return await axiosWithAuth.put('/api/meet', data)
  },

  async getMeetingCustomerInfo(id: string) {
    return await axiosWithAuth.get<IGetCustomerInfoByMeet>(`/api/meet/customerInfo/${id}`)
  },

  async deleteMeeting(id: number) {
    await axiosWithAuth.delete(`api/meet/delete/${id}`)
  },

  async createMeeting(data: ICreateMeeting) {
    return await axiosWithAuth.post('/api/meet', data)
  },

  async getUnvailableMeetingDates(startDate: string, endDate: string) {
    return await axiosWithAuth.get('/api/meet/unavailable-dates/', {
      params: {
        startDate,
        endDate,
      },
    })
  },
}
