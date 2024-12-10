import { IClient } from '@/types/clients'

export interface IChild {
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
  financialCondition: number
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
  bringsClient: string
  firstParent: IClient
  secondParent: IClient
  payerFullName: string
  adultRequestForTherapyReason: string
  adultRequestForTherapyDesiredOutcome: string
  childExplanationForSeeingPsychologist: string
  childDesiredChanges: string
}
