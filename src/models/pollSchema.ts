import { z } from 'zod'

export const surveySchema = z.object({
  clientChoices: z.array(
    z
      .object({
        answerOptionId: z.union([z.string(), z.array(z.string())]).refine(
          (val) => {
            if (Array.isArray(val)) {
              return val.length > 0
            }
            return true
          },
          { message: 'Выберите хотя бы один вариант.' },
        ),
        text: z.string().optional(),
        type: z.literal('Развернутый ответ').optional(),
      })
      .refine(
        (data) => {
          if (data.type === 'Развернутый ответ') {
            return !!data.text?.trim()
          }
          return true
        },
        { message: 'Поле обязательно для развернутого ответа', path: ['text'] },
      ),
  ),
})

export const testSchema = z.object({
  clientChoices: z.array(
    z.object({
      answerOptionId: z.string(),
    }),
  ),
})
