import { axiosWithAuth } from '@/api/interceptors'
import { UserMeeting } from '@/helpers/types/calendar'
import { ICalendarData, ICalendarNotifications, INonWorkingDay, ISearchUser } from '@/types/calendar'

export const calendarService = {
  async createAdultUser(data: UserMeeting): Promise<any> {
    return await axiosWithAuth.post('api/customer', data)
  },
  async createChildUser(data: UserMeeting): Promise<any> {
    return await axiosWithAuth.post('/api/child', data)
  },
  async createCoupleUser(data: UserMeeting): Promise<any> {
    return await axiosWithAuth.post('/api/pair', data)
  },

  async createNonWorkingDay(data: INonWorkingDay) {
    return await axiosWithAuth.post(`/api/nonWorkingDay`, data)
  },

  async getNotifications() {
    return await axiosWithAuth.get<ICalendarNotifications>(`api/v1/General/leftMenu/notification`)
  },

  async getNonWorkingDaysUnavailableDates(startDate: string, endDate: string) {
    return await axiosWithAuth.get(`api/nonWorkingDay/unavailable-dates`, {
      params: {
        startDate,
        endDate,
      },
    })
  },

  async getCalendarData(year: number) {
    return await axiosWithAuth.get<ICalendarData>(`/api/v1/General/calendarData/get/${year}`)
  },

  async deleteUserById(id: number): Promise<any> {
    return await axiosWithAuth.delete(`api/customer/delete/${id}`)
  },

  async getUsersByName(name: string) {
    return await axiosWithAuth.get<ISearchUser[]>(`/api/v1/Header/searchPersons/${name}`)
  },
}
