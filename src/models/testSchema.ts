import { z } from 'zod'

export const TestSchema = z.object({
  title: z.string().min(1, 'Название не может быть пустым'),
  description: z.string().min(1, 'Описание не может быть пустым'),
  questions: z.array(
    z.object({
      id: z.number().default(0),
      type: z.string().min(1, 'Тип вопроса не может быть пустым'),
      text: z.string().min(1, 'Текст вопроса не может быть пустым'),
      answerOptions: z.array(
        z.object({
          id: z.number().default(0),
          text: z.string().min(1, 'Текст варианта ответа не может быть пустым'),
          correct: z.boolean(),
        }),
      ),
    }),
  ),
  test: z.boolean(),
})

export type TestSchemaType = z.infer<typeof TestSchema>
