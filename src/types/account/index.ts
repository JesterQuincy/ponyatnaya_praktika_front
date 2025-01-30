interface UserDiploma {
  id?: number
  userId?: number
  photoDiploma: string
}

export interface IAccount {
  id?: number
  subscriptionActive?: string | null
  firstName: string
  secondName?: string | null
  lastName: string
  phoneNumber?: string | null
  city?: string | null
  mail?: string | null
  specialization?: string | null
  professionalActivityDescription?: string | null
  education?: string | null
  userImage?: string | null
  userDiplomasList?: UserDiploma[]
}
