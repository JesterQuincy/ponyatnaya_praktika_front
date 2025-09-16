import { stringOrDate } from 'react-big-calendar'
import { EMeetingFormat } from '@/types/clients'
import { EPaymentType } from '@/components/ui/AddMeetModal/types'

export interface UserMeeting {
  customerId?: number
  id?: number
  customer?: object
  firstName?: string
  lastName?: string
  secondName?: string
  birth?: stringOrDate
  phoneNumber?: string
  mail?: string
  gender?: string
  clientStatus?: string
  meetingFormat?: string
  user?: object
  subscriptionActive?: string
  fullName?: string
  city?: string
  specialization?: string
  professionalActivityDescription?: string
  education?: string
  diplomas?: string
  endMeet?: string
  formatMeet?: string
  paymentType?: string
  nameMeet?: string
  dateMeet?: stringOrDate
  nextStartMeet?: stringOrDate
  nextEndMeet?: stringOrDate
  clientSessionRequest?: string
  therapistStateAtSessionStart?: string
  mainTopicsDiscussedDuringSession?: string
  clientKeyPhrasesInsights?: string
  clientMainEmotions?: string
  therapistMainEmotionsExpressed?: string
  therapistUnexpressedEmotions?: string
  techniquesAndMethodsUsed?: string
  clientMainObstaclesMethods?: string
  therapistStateAtSessionEnd?: string
  planNextSession?: string
  supervisionThemAndProblem?: string
  clientType?: string
  startMeet?: string
}

export interface ICreateMeeting {
  nameMeet?: string
  customerId?: number
  dateMeet: string
  startMeet: string
  endMeet: string
  formatMeet: EMeetingFormat
  place: string
  paymentType?: EPaymentType
  repeat?: ECreateMeetingRepeat
  /** На дату */
  onDate?: string // yyyy-mm-dd
  /** Через */
  onCount?: number
}

export enum ECreateMeetingRepeat {
  NONE = 'Не повторять',
  MONTHLY = 'Ежемесячно',
  WEEKLY = 'Еженедельно',
  DAILY = 'Ежедневно',
}

export interface IUnavailabeDatesError {
  emptyWarning: boolean
  meetsMessage: string
  nonWorkingDaysMessage: string
  otherMeetsMessage: string
}
