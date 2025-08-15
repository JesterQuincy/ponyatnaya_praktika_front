import { EFinishRepetition, EModalType, EPaymentType } from './types'
import { EMeetingFormat } from '@/types/clients'
import { ECreateMeetingRepeat } from '@/helpers/types/calendar'

export const DEFAULT_VALUES = {
  type: EModalType.CLIENT,
  formatMeet: EMeetingFormat.ONLINE,
  repeat: ECreateMeetingRepeat.NONE,
  paymentType: EPaymentType.CASH,
  duration: 60,
}

export const modalTypeOptions = {
  [EModalType.CLIENT]: 'Встреча с клиентом',
  [EModalType.OTHER]: 'Иное',
}

export const mappedFinishRepetition = {
  [EFinishRepetition.ON_DATE]: 'В дату',
  [EFinishRepetition.ON_COUNT]: 'Через',
}
