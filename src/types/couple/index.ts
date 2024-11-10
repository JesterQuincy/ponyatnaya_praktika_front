import { IClient } from '@/types/clients'

export interface ICouple {
  id: number
  clientType: string
  fullName: string
  firstName: string
  secondName: string
  lastName: string
  birth: string // Можно использовать Date, если хотите работать с датами
  phoneNumber: string
  mail: string
  gender: string
  clientStatus: string
  meetingFormat: string
  secondCustomer: IClient
  clientFirstRequestTherapyReason: string
  clientFirstRequestTherapyDesiredOutcome: string
  secondClientRequestTherapyReason: string
  clientSecondRequestTherapyDesiredOutcome: string
  fullNameCotherapy: string
  phoneNumberCotherapy: string
  mailCotherapy: string
  financialTermsCotherapists: string
  familyStatus: string
}
