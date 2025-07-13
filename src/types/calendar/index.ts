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
