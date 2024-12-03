export interface IClient {
  id: number
  clientType: string
  fullName: string
  firstName: string
  secondName: string
  lastName: string
  birth: string // Можно заменить на Date, если предполагается использование объектов даты
  phoneNumber: string
  mail: string
  gender: string
  clientStatus: string
  meetingFormat: string
  contactMethod: string
  dateFirstRequest: string // Также можно заменить на Date
  dateFirstConsultation: string // Аналогично
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
  notes: string
}
