import { IMeetingDetails } from '@/types/meet/getMeetById'

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

export interface IProjectiveMethod {
  id: number
  meet: IMeetingDetails
  dateCreateMethod: string
  typeMethod: ITypeMethod
  photoProjectiveMethods: IPhotoProjectiveMethod[]
}

interface IPhotoProjectiveMethod {
  id: number
  projectiveMethod: string
  photoMethod: string
  dateCreatePhoto: string
}

export interface IMeetProjMethod {
  id: number
  meet: IMeetingDetails
  dateCreateMethod: string
  typeMethod: ITypeMethod
  photoProjectiveMethods: IPhotoProjectiveMethod[]
}
