export interface ICalendarData {
  currentDate: string
  clientsData: IClientsData[]
  nonWorkingDays: IClientDataNonWorkingDays[]
}

interface IClientsData {
  fullName: string
  firstName: string
  secondName: string
  lastName: string
  clientType: string
  meetings: IClientDataMeetings[]
}

interface IClientDataMeetings {
  id: number
  startTime: string
  endTime: string
  formatMeet: string
  title: string
}

interface IClientDataNonWorkingDays {
  id: number
  title: string
  date: string
}

export interface ICalendarNotifications {
  count: number
  notificationResponseList: ICalendarNotificationResponseList[]
}

interface ICalendarNotificationResponseList {
  customerId: number
  dateFirstRequest: string //'2025-07-14'
  customerFullName: string
  clientType: string
  applicationFormStatus: number
}

export interface INonWorkingDay {
  title: string
  dateStart: string
  dateEnd: string
}
