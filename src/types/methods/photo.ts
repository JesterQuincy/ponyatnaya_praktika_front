import { IProjectiveMethod } from '@/types/methods/meetMethods'

export interface IPhotoProjectiveMethod {
  id: number
  projectiveMethod: IProjectiveMethod
  photoMethod: string
  dateCreatePhoto: string
}
