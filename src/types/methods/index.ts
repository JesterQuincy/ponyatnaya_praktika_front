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

export interface IMethodic {
  id: number
  nameMethod: string
  user: IUser
}

export type TMethodsArray = IMethodic[]
