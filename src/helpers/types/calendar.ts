import { stringOrDate } from 'react-big-calendar'

export interface UserMeeting {
  id?: number
  person?: object
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
