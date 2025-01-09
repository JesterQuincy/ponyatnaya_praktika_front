import { z } from 'zod'

export const TestPollSchema = z.object({
  description: z.string().min(1, 'Описание не может быть пустым'),
  questions: z.array(
    z.object({
      id: z.number(), // ID вопроса
      text: z.string().min(1, 'Вопрос не может быть пустым'),
      type: z.enum(['Один из списка', 'Несколько из списка', 'Развёрнутый ответ']),
      answerOptions: z.array(
        z.object({
          id: z.number(), // ID варианта ответа
          text: z.string().min(1, 'Текст варианта ответа не может быть пустым'),
          correct: z.boolean(), // Флаг правильности
        }),
      ),
    }),
  ),
})

export type TestPollSchemaType = z.infer<typeof TestPollSchema>
