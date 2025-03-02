import { IMeetingDetails } from '@/types/meet/getMeetById'
import { IClient } from '@/types/clients'

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

export interface IPhotoProjectiveMethod {
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
  customer: IClient
}

interface UserDiploma {
  id: number
  photoDiploma: string
}

interface User {
  id: number
  subscriptionActive: string
  firstName: string
  secondName: string
  lastName: string
  fullName: string
  phoneNumber: string
  city: string
  mail: string
  specialization: string
  professionalActivityDescription: string
  education: string
  userImage: string
  userDiplomasList: UserDiploma[]
}

export interface IMethod {
  id: number
  nameMethod: string
  user: User
}

export type IMethodsList = IMethod[]
