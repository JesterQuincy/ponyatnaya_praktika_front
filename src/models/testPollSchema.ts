import { z } from 'zod'

export const TestPollSchema = z.object({
  title: z.string().min(1, 'Название не может быть пустым'),
  description: z.string().min(1, 'Описание не может быть пустым'),
  questions: z.array(
    z
      .object({
        id: z.number(),
        text: z.string().min(1, 'Вопрос не может быть пустым'),
        type: z.enum(['Один из списка', 'Несколько из списка', 'Развернутый ответ']),
        order: z.number(),
        answerOptions: z.array(
          z.object({
            id: z.number(),
            text: z.string().optional(),
            correct: z.boolean(),
          }),
        ),
      })
      .superRefine((question, ctx) => {
        if (question.type !== 'Развернутый ответ') {
          question.answerOptions.forEach((option, index) => {
            if (!option.text || option.text.trim().length === 0) {
              ctx.addIssue({
                code: 'custom',
                message: 'Текст варианта ответа не может быть пустым',
                path: ['answerOptions', index, 'text'], // Путь к ошибке
              })
            }
          })
        }
      }),
  ),
  test: z.boolean(),
})

export type TestPollSchemaType = z.infer<typeof TestPollSchema>
