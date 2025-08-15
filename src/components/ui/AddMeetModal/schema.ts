import { z } from 'zod'
import { EMeetingFormat } from '@/types/clients'
import { EFinishRepetition, EModalType, EPaymentType } from '@/components/ui/AddMeetModal/types'
import dayjs from 'dayjs'
import { ECreateMeetingRepeat } from '@/helpers/types/calendar'

const norm = (v: unknown) =>
  String(v ?? '')
    .trim()
    .toLowerCase()

const baseSchema = z.object({
  type: z.enum(EModalType),

  customerId: z.preprocess(
    (v) => {
      if (v === null || v === '') return undefined
      if (typeof v === 'object' && v && 'value' in v) return Number((v as any).value)
      if (typeof v === 'string') return Number(v)
      return v
    },
    z.union([z.number({ message: 'Клиент обязателен' }).positive('Клиент обязателен'), z.undefined()]),
  ),

  paymentType: z.enum(EPaymentType).optional(),
  nameMeet: z.string().optional(),

  dateMeet: z
    .string({ message: 'Дата встречи обязательна' })
    .trim()
    .min(1, 'Дата встречи обязательна')
    .refine(
      (v) => {
        const d = dayjs(v, 'YYYY-MM-DD', true)
        if (!d.isValid()) return false
        return !d.isBefore(dayjs(), 'day')
      },
      { message: 'Дата встречи не может быть раньше текущей' },
    ),

  time: z.string({ message: 'Время встречи обязательно' }).trim().min(1, 'Время встречи обязательно'),

  duration: z.coerce
    .number({ message: 'Длительность встречи обязательна' })
    .int('Длительность должна быть целым числом')
    .positive('Длительность должна быть больше 0'),

  formatMeet: z.enum(EMeetingFormat, { message: 'Формат встречи обязателен' }),
  place: z.string({ message: 'Место встречи обязательно' }).trim().min(1, 'Место встречи обязательно'),
  repeat: z.enum(ECreateMeetingRepeat).default(ECreateMeetingRepeat.NONE),
  finishRepetition: z.enum(EFinishRepetition).optional(),
  onDate: z.string().optional(),
  onCount: z.string().optional(),
})

// ГЛАВНОЕ ИСПРАВЛЕНИЕ: все проверки в одном superRefine вместо .and()
export const schema = baseSchema.superRefine((data, ctx) => {
  if (data.type === EModalType.CLIENT) {
    if (!data.customerId) {
      ctx.addIssue({ code: 'custom', path: ['customerId'], message: 'Клиент обязателен' })
    }
    if (!data.paymentType) {
      ctx.addIssue({ code: 'custom', path: ['paymentType'], message: 'Метод оплаты обязателен' })
    }
  }

  if (data.type === EModalType.OTHER) {
    const nm = String(data.nameMeet ?? '').trim()
    if (!nm) {
      ctx.addIssue({ code: 'custom', path: ['nameMeet'], message: 'Название встречи обязательно' })
    }
  }

  // Проверки повторений
  const repeatNorm = norm(data.repeat)
  const noRepeat = repeatNorm === 'не повторять' || repeatNorm === 'none'
  if (noRepeat) return

  const fin = data.finishRepetition as EFinishRepetition | undefined
  if (!fin) {
    ctx.addIssue({ code: 'custom', path: ['finishRepetition'], message: 'Выберите, когда закончить повторения' })
    return
  }

  if (fin === EFinishRepetition.ON_DATE) {
    const onDateStr = String(data.onDate ?? '').trim()
    if (!onDateStr) {
      ctx.addIssue({ code: 'custom', path: ['onDate'], message: 'Укажите дату окончания повторений' })
    } else {
      const dateMeetStr = String(data.dateMeet ?? '').trim()
      if (dateMeetStr) {
        const dm = dayjs(dateMeetStr, 'YYYY-MM-DD', true)
        const od = dayjs(onDateStr, 'YYYY-MM-DD', true)

        if (dm.isValid() && od.isValid() && od.isBefore(dm, 'day')) {
          ctx.addIssue({
            code: 'custom',
            path: ['onDate'],
            message: 'Дата окончания не может быть раньше даты встречи',
          })
        }
      }
    }
  }

  if (fin === EFinishRepetition.ON_COUNT) {
    const raw = String(data.onCount ?? '').trim()
    if (!/^[1-9]\d*$/.test(raw)) {
      ctx.addIssue({ code: 'custom', path: ['onCount'], message: 'Укажите количество повторений (целое число > 0)' })
    }
  }
})

export type TAddMeetSchema = z.infer<typeof baseSchema>
