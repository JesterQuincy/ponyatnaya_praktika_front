import { z } from 'zod'

export const TestPollSchema = z.object({
  questions: z.array(
    z.object({
      question: z.string(),
      answerFormat: z.enum(['Один из списка', 'Несколько из списка', 'Развёрнутый ответ']),
      options: z.array(
        z.object({
          id: z.string(),
          value: z.string(),
        }),
      ),
    }),
  ),
})

export type TestPollSchemaType = z.infer<typeof TestPollSchema>
