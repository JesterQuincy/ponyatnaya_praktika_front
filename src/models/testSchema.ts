import { z } from 'zod'

export const TestSchema = z.object({
  questions: z.array(
    z.object({
      question: z.string().min(1, 'Вопрос не может быть пустым'),
      correctAnswer: z.string().min(1, 'Правильный ответ не может быть пустым'),
      incorrectAnswer: z.string().min(1, 'Неправильный ответ не может быть пустым'),
    }),
  ),
})

export type TestSchemaType = z.infer<typeof TestSchema>
