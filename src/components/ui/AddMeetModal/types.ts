export enum EModalType {
  CLIENT = 'client',
  OTHER = 'other',
}

export enum EPaymentType {
  CASH = 'Наличная',
  NON_CASH = 'Безналичная',
}

export enum EFinishRepetition {
  ON_DATE = 'on_date',
  ON_COUNT = 'on_count',
}

export const modalTypeOptions = {
  [EModalType.CLIENT]: 'Встреча с клиентом',
  [EModalType.OTHER]: 'Иное',
}
