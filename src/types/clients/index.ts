import { EClientType, TRequestTypeBuilder, TResponseTypeBuilder } from '@/types/common'

export interface IClient {
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
}

export interface IGetClientsBySearchResponseBody {
  customerId: number
  fullName: string
  years: number
  clientType: EClientType
  mail: string
  phone: string
  meetDate: string
  countMeet: number
  clientStatus: string
  meetingType: string
}

export type TGetClientsBySearchResponse = TResponseTypeBuilder<IGetClientsBySearchResponseBody>

export interface IGetClientBySearchRequestBody {
  /** Поиск по имени */
  customerName?: string
  /** Поиск по дате */
  orderDate?: EOrderDate
  /** Поиск по интенсивности встреч */
  orderMeetCount?: EOrderMeetCount
  /** Поиск по типу клиента */
  clientType?: EGetClientBySearchClientType
  /** Поиск по статусу клиента */
  clientStatus?: EClientStatus
  /** Поиск по формату встречи */
  meetingFormat?: EMeetingFormat
}

export type IGetClientBySearchRequest = TRequestTypeBuilder<IGetClientBySearchRequestBody>

export enum EMeetingFormat {
  ONLINE = 'Онлайн',
  OFFLINE = 'Офлайн',
}

export enum EClientStatus {
  NEW = 'Новые клиенты',
  REGULAR = 'Регулярный',
  BY_REQUEST = 'По запросу',
  FINISHED = 'Завершен',
  REQUEST = 'Заявка',
}

export enum EGetClientBySearchClientType {
  ADULT = 'Взрослый',
  CHILD = 'Ребенок',
  COUPLE = 'Пара',
}

export enum EOrderDate {
  asc = 'Позже',
  desc = 'Раньше',
}

export enum EOrderMeetCount {
  desc = 'Чаще',
  asc = 'Реже',
}
