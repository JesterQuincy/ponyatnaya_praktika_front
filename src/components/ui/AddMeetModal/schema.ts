import { z } from 'zod'
import { EMeetingFormat } from '@/types/clients'
import { EFinishRepetition, EModalType, EPaymentType } from '@/components/ui/AddMeetModal/types'
import dayjs from 'dayjs'
import { ECreateMeetingRepeat } from '@/helpers/types/calendar'

const norm = (v: unknown) =>
  String(v ?? '')
    .trim()
    .toLowerCase()

// Делаем все обязательные поля optional в базовой схеме
// и переносим всю валидацию в superRefine
const baseSchema = z.object({
  type: z.enum(EModalType),
  customerId: z.preprocess(
    (v) => {
      if (v === null || v === '') return undefined
      if (typeof v === 'object' && v && 'value' in v) return Number((v as any).value)
      if (typeof v === 'string') return Number(v)
      return v
    },
    z.union([z.number().positive(), z.undefined()]).optional(),
  ),

  paymentType: z.enum(EPaymentType).optional(),
  nameMeet: z.string().optional(),
  dateMeet: z.string().optional(),
  time: z.string().optional(),
  duration: z.coerce.number().optional(),
  formatMeet: z.enum(EMeetingFormat).optional(),
  place: z.string().optional(),
  repeat: z.enum(ECreateMeetingRepeat).default(ECreateMeetingRepeat.NONE),
  finishRepetition: z.enum(EFinishRepetition).optional(),
  onDate: z.string().optional(),
  onCount: z.string().optional(),
})

export const schema = baseSchema.superRefine((data, ctx) => {
  const dateMeetStr = String(data.dateMeet ?? '').trim()
  if (!dateMeetStr) {
    ctx.addIssue({
      code: 'custom',
      path: ['dateMeet'],
      message: 'Дата встречи обязательна',
    })
  } else {
    const d = dayjs(dateMeetStr, 'YYYY-MM-DD', true)
    if (!d.isValid()) {
      ctx.addIssue({
        code: 'custom',
        path: ['dateMeet'],
        message: 'Некорректная дата',
      })
    } else if (d.isBefore(dayjs(), 'day')) {
      ctx.addIssue({
        code: 'custom',
        path: ['dateMeet'],
        message: 'Дата встречи не может быть раньше текущей',
      })
    }
  }

  // Валидация time
  const timeStr = String(data.time ?? '').trim()
  if (!timeStr) {
    ctx.addIssue({
      code: 'custom',
      path: ['time'],
      message: 'Время встречи обязательно',
    })
  }

  // Валидация duration
  if (data.duration === undefined || data.duration === null) {
    ctx.addIssue({
      code: 'custom',
      path: ['duration'],
      message: 'Длительность встречи обязательна',
    })
  } else if (!Number.isInteger(data.duration) || data.duration <= 0) {
    ctx.addIssue({
      code: 'custom',
      path: ['duration'],
      message: 'Длительность должна быть целым числом больше 0',
    })
  }

  // Валидация formatMeet
  if (!data.formatMeet) {
    ctx.addIssue({
      code: 'custom',
      path: ['formatMeet'],
      message: 'Формат встречи обязателен',
    })
  }

  // Валидация place
  const placeStr = String(data.place ?? '').trim()
  if (!placeStr) {
    ctx.addIssue({
      code: 'custom',
      path: ['place'],
      message: 'Место встречи обязательно',
    })
  }

  // Валидация в зависимости от типа
  if (data.type === EModalType.CLIENT) {
    if (!data.customerId) {
      ctx.addIssue({
        code: 'custom',
        path: ['customerId'],
        message: 'Клиент обязателен',
      })
    }
    if (!data.paymentType) {
      ctx.addIssue({
        code: 'custom',
        path: ['paymentType'],
        message: 'Метод оплаты обязателен',
      })
    }
  }

  if (data.type === EModalType.OTHER) {
    const nm = String(data.nameMeet ?? '').trim()
    if (!nm) {
      ctx.addIssue({
        code: 'custom',
        path: ['nameMeet'],
        message: 'Название встречи обязательно',
      })
    }
  }

  // Проверки повторений
  const repeatNorm = norm(data.repeat)
  const noRepeat = repeatNorm === 'не повторять' || repeatNorm === 'none'
  if (noRepeat) return

  const fin = data.finishRepetition as EFinishRepetition | undefined
  if (!fin) {
    ctx.addIssue({
      code: 'custom',
      path: ['finishRepetition'],
      message: 'Выберите, когда закончить повторения',
    })
    return
  }

  if (fin === EFinishRepetition.ON_DATE) {
    const onDateStr = String(data.onDate ?? '').trim()
    if (!onDateStr) {
      ctx.addIssue({
        code: 'custom',
        path: ['onDate'],
        message: 'Укажите дату окончания повторений',
      })
    } else if (dateMeetStr) {
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

  if (fin === EFinishRepetition.ON_COUNT) {
    const raw = String(data.onCount ?? '').trim()
    if (!/^[1-9]\d*$/.test(raw)) {
      ctx.addIssue({
        code: 'custom',
        path: ['onCount'],
        message: 'Укажите количество повторений (целое число > 0)',
      })
    }
  }
})

export type TAddMeetSchema = z.infer<typeof baseSchema>
