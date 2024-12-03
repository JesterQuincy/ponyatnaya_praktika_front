import { IClient } from '@/types/clients'

export interface IChild {
  id: number
  clientType: string
  fullName: string
  firstName: string
  secondName: string
  lastName: string
  birth: string // или Date
  phoneNumber: string
  mail: string
  gender: string
  clientStatus: string
  meetingFormat: string
  bringsClient: string
  firstParent: IClient
  secondParent: IClient
  payerFullName: string
  adultRequestForTherapyReason: string
  adultRequestForTherapyDesiredOutcome: string
  childExplanationForSeeingPsychologist: string
  childDesiredChanges: string
}
