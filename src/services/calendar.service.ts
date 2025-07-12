import { axiosWithAuth } from '@/api/interceptors'
import { UserMeeting } from '@/helpers/types/calendar'

export const calendarService = {
  async createMeeting(data: UserMeeting): Promise<any> {
    return await axiosWithAuth.post('/api/meet', data)
  },
  async createAdultUser(data: UserMeeting): Promise<any> {
    return await axiosWithAuth.post('api/customer', data)
  },
  async createChildUser(data: UserMeeting): Promise<any> {
    return await axiosWithAuth.post('/api/child', data)
  },
  async createCoupleUser(data: UserMeeting): Promise<any> {
    return await axiosWithAuth.post('/api/pair', data)
  },
  async getUserById(id: number): Promise<any> {
    return await axiosWithAuth.get(`customer/get/${id}`)
  },

  async getNotifications(): Promise<any> {
    return await axiosWithAuth.get(`api/v1/General/leftMenu/notification`)
  },
  async getUserInfo(): Promise<any> {
    return await axiosWithAuth.get(`/api/v1/General/leftMenu/userInfo`)
  },
  async getCalendarData(year: number): Promise<any> {
    return await axiosWithAuth.get(`/api/v1/General/calendarData/get/${year}`)
  },
  async getUsersByName(name: string): Promise<any> {
    return await axiosWithAuth.get(`/api/v1/Header/searchPersons/${name}`)
  },
}
