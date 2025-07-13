import { axiosWithAuth } from '@/api/interceptors'
import { UserMeeting } from '@/helpers/types/calendar'
import { ICalendarData } from '@/types/calendar'

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

  async getNotifications(): Promise<any> {
    return await axiosWithAuth.get(`api/v1/General/leftMenu/notification`)
  },

  async getCalendarData(year: number) {
    return await axiosWithAuth.get<ICalendarData>(`/api/v1/General/calendarData/get/${year}`)
  },

  async getUsersByName(name: string): Promise<any> {
    return await axiosWithAuth.get(`/api/v1/Header/searchPersons/${name}`)
  },
}
