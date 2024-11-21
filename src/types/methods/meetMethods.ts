import { IClient } from '@/types/clients'
import { IMeetingDetails } from '@/types/meet/getMeetById'

interface Time {
  hour: number
  minute: number
  second: number
  nano: number
}

interface IUser {
  id: number
  subscriptionActive: string
  fullName: string
  phoneNumber: string
  city: string
  mail: string
  specialization: string
  professionalActivityDescription: string
  education: string
  diplomas: string
  userImage: string
}

interface ITypeMethod {
  id: number
  nameMethod: string
  user: IUser
}

interface IProjectiveMethod {
  id: number
  meet: IMeetingDetails
  dateCreateMethod: string
  typeMethod: ITypeMethod
}

interface IPhotoProjectiveMethod {
  id: number
  projectiveMethod: IProjectiveMethod
  photoMethod: string
  dateCreatePhoto: string
}

export interface IMeetProjMethod {
  meet: IMeetingDetails
  dateCreateMethod: string
  typeMethod: ITypeMethod
  photoProjectiveMethod: IPhotoProjectiveMethod[]
}
