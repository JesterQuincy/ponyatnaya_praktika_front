export interface IMeetingDetails {
  id: number
  customer: IPerson
  nameMeet: string
  dateMeet: string // или `Date`
  startMeet: string
  place: string
  // startMeet: ITime
  endMeet: string
  // endMeet: ITime
  formatMeet: string
  paymentType: string
  nextDayMeet: string // или `Date`
  nextStartMeet: string
  // nextStartMeet: ITime
  nextEndMeet: string
  // nextEndMeet: ITime
  //
  clientSessionRequest: string
  therapistStateAtSessionStart: string
  mainTopicsDiscussedDuringSession: string
  clientKeyPhrasesInsights: string
  clientMainEmotions: string
  therapistMainEmotionsExpressed: string
  techniquesAndMethodsUsed: string
  clientMainObstaclesMethods: string
  //
  therapistUnexpressedEmotions: string
  therapistStateAtSessionEnd: string
  planNextSession: string
  supervisionThemAndProblem: string
  note: string
}

interface ITime {
  hour: number
  minute: number
  second: number
  nano: number
}

interface IPerson {
  id: number
  clientType: string
  fullName: string
  firstName: string
  secondName: string
  lastName: string
  birth: string // или `Date`, если данные приходят в формате даты
  phoneNumber: string
  mail: string
  gender: string
  dateFirstRequest: string // или `Date`
  clientStatus: string
  meetingFormat: string
  financialCondition?: string
}
