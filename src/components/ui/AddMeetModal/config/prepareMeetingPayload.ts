import { TAddMeetSchema } from '../schema'
import { EModalType } from '../types'
import dayjs from 'dayjs'

export const prepareMeetingPayload = (data: TAddMeetSchema, type: EModalType) => {
  if (!data.dateMeet || !data.time || !data.formatMeet || !data.place) return

  const start = dayjs(`${data.dateMeet} ${data.time}`, 'YYYY-MM-DD HH:mm', true)

  if (!start.isValid() || !Number.isFinite(data.duration)) {
    return
  }

  if (!data.duration) return

  const end = start.add(data.duration, 'minute')
  const startMeet = start.format('HH:mm')
  const endMeet = end.format('HH:mm')

  if (type === EModalType.CLIENT) {
    return {
      customerId: data.customerId,
      dateMeet: data.dateMeet,
      formatMeet: data.formatMeet,
      place: data.place,
      paymentType: data.paymentType,
      repeat: data.repeat,
      onDate: data.onDate,
      onCount: data.onCount ? Number(data.onCount) : undefined,
      startMeet,
      endMeet,
    }
  }

  return {
    nameMeet: data.nameMeet,
    dateMeet: data.dateMeet,
    formatMeet: data.formatMeet,
    place: data.place,
    repeat: data.repeat,
    onDate: data.onDate,
    onCount: data.onCount ? Number(data.onCount) : undefined,
    startMeet,
    endMeet,
  }
}
