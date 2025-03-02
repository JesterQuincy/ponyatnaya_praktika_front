import { z } from 'zod'

export const TestSchema = z.object({
  title: z.string().min(1, 'Название не может быть пустым'),
  description: z.string().optional(),
  questions: z.array(
    z.object({
      order: z.number(),
      id: z.number(),
      text: z.string().min(1, 'Текст вопроса не может быть пустым'),
      answerOptions: z.array(
        z.object({
          id: z.number(),
          text: z.string().min(1, 'Текст варианта ответа не может быть пустым'),
          correct: z.boolean(),
        }),
      ),
    }),
  ),
  test: z.boolean(),
})

export type TestSchemaType = z.infer<typeof TestSchema>
