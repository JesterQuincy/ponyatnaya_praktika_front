import { z } from 'zod'
import { EMeetingFormat } from '@/types/clients'
import { EFinishRepetition, EModalType, EPaymentType } from '@/components/ui/AddMeetModal/types'
import dayjs from 'dayjs'
import { ECreateMeetingRepeat } from '@/helpers/types/calendar'

const norm = (v: unknown) =>
  String(v ?? '')
    .trim()
    .toLowerCase()

// 1) База — как и была
const baseSchema = z.object({
  type: z.nativeEnum(EModalType), // 'client' | 'other'

  customerId: z.preprocess(
    (v) => {
      if (v === null || v === '') return undefined
      if (typeof v === 'object' && v && 'value' in v) return Number((v as any).value)
      if (typeof v === 'string') return Number(v)
      return v
    },
    z.union([
      z
        .number({
          invalid_type_error: 'Клиент обязателен', // если пришло не число
        })
        .positive('Клиент обязателен'),
      z.undefined(), // <-- явно разрешаем undefined
    ]),
  ),
  paymentType: z.nativeEnum(EPaymentType).optional(),
  nameMeet: z.string().optional(),

  dateMeet: z
    .string({ required_error: 'Дата встречи обязательна' })
    .trim()
    .min(1, 'Дата встречи обязательна')
    .refine(
      (v) => {
        const d = dayjs(v, 'YYYY-MM-DD', true) // строгий парс из <input type="date">
        if (!d.isValid()) return false // на всякий случай
        return !d.isBefore(dayjs(), 'day') // не раньше сегодняшнего дня
      },
      { message: 'Дата встречи не может быть раньше текущей' },
    ),
  time: z.string({ required_error: 'Время встречи обязательно' }).trim().min(1, 'Время встречи обязательно'),
  duration: z.preprocess(
    (v) => {
      if (v === '' || v === null || v === undefined) return undefined
      if (typeof v === 'string') return Number(v)
      return v
    },
    z
      .number({
        required_error: 'Длительность встречи обязательна',
        invalid_type_error: 'Длительность должна быть числом',
      })
      .int('Длительность должна быть целым числом')
      .positive('Длительность должна быть больше 0'),
  ),
  formatMeet: z.nativeEnum(EMeetingFormat, { errorMap: () => ({ message: 'Формат встречи обязателен' }) }),
  place: z.string({ required_error: 'Место встречи обязательно' }).trim().min(1, 'Место встречи обязательно'),
  // в ваших данных repeat бывает русской строкой
  repeat: z.nativeEnum(ECreateMeetingRepeat).default(ECreateMeetingRepeat.NONE),

  finishRepetition: z.nativeEnum(EFinishRepetition).optional(), // 'on_date' | 'on_count'
  onDate: z.preprocess((v) => (v === '' ? undefined : v), z.string().optional()),
  onCount: z.string().optional(),
})

// 2) Гард по веткам (всегда выполняется)
const typeGuard = z.any().superRefine((d, ctx) => {
  if ((d as any).type === EModalType.CLIENT) {
    if (!(d as any).customerId) {
      ctx.addIssue({ code: 'custom', path: ['customerId'], message: 'Клиент обязателен' })
    }
    if (!(d as any).paymentType) {
      ctx.addIssue({ code: 'custom', path: ['paymentType'], message: 'Метод оплаты обязателен' })
    }
  }
  if ((d as any).type === EModalType.OTHER) {
    const nm = String((d as any).nameMeet ?? '').trim()
    if (!nm) {
      ctx.addIssue({ code: 'custom', path: ['nameMeet'], message: 'Название встречи обязательно' })
    }
  }
})

// 3) Гард повторов (выполняется всегда, но возвращает ошибки только если повторы включены)
const repetitionGuard = z.any().superRefine((d, ctx) => {
  const repeatNorm = norm((d as any).repeat)
  const noRepeat = repeatNorm === 'не повторять' || repeatNorm === 'none'
  if (noRepeat) return

  const fin = (d as any).finishRepetition as EFinishRepetition | undefined
  if (!fin) {
    ctx.addIssue({ code: 'custom', path: ['finishRepetition'], message: 'Выберите, когда закончить повторения' })
    return
  }

  if (fin === EFinishRepetition.ON_DATE) {
    const onDateStr = String((d as any).onDate ?? '').trim()
    if (!onDateStr) {
      ctx.addIssue({ code: 'custom', path: ['onDate'], message: 'Укажите дату окончания повторений' })
    } else {
      // --- НОВОЕ: onDate не раньше dateMeet ---
      const dateMeetStr = String((d as any).dateMeet ?? '').trim()
      if (dateMeetStr) {
        const dm = dayjs(dateMeetStr, 'YYYY-MM-DD', true) // строгое парсинг из input[type=date]
        const od = dayjs(onDateStr, 'YYYY-MM-DD', true)

        // если обе даты валидны и onDate раньше даты встречи -> ошибка
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
    const raw = String((d as any).onCount ?? '').trim()
    if (!/^[1-9]\d*$/.test(raw)) {
      ctx.addIssue({ code: 'custom', path: ['onCount'], message: 'Укажите количество повторений (целое число > 0)' })
    }
  }
})

// 4) Итог: база ∧ проверки по веткам ∧ проверки повторов
export const schema = baseSchema.and(typeGuard).and(repetitionGuard)

// Тип данных формы берём с базы
export type TAddMeetSchema = z.infer<typeof baseSchema>
