import { IClient } from '@/types/clients'

export interface ICouple {
  id: number
  clientType: string
  fullName: string
  firstName: string
  secondName: string
  lastName: string
  birth: string
  phoneNumber: string
  mail: string
  gender: string
  clientStatus: string
  meetingFormat: string
  contactMethod: string
  dateFirstRequest: string
  dateFirstConsultation: string
  onlinePlatform: string
  offlineAddress: string
  clientTherapyRequest: string
  meetingTimeDay: string
  financialCondition: 0
  residenceAddress: string
  peerRecommendation: string
  specialTermsContact: string
  familyStatus: string
  priorityCommunicationChannel: string
  supervisionStatusThisClient: string
  contactSupervisor: string
  supervisionMaterial: string
  takingMedic: string
  prevExperience: string
  notes: string
  secondPerson: IClient
  clientFirstRequestTherapyReason: string
  clientFirstRequestTherapyDesiredOutcome: string
  secondClientRequestTherapyReason: string
  clientSecondRequestTherapyDesiredOutcome: string
  fullNameCotherapy: string
  phoneNumberCotherapy: string
  mailCotherapy: string
  financialTermsCotherapists: string
}
