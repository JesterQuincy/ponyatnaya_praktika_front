import { z } from 'zod'

export const surveySchema = z.object({
  clientChoices: z.array(
    z.object({
      answerOptionId: z.string(),
    }),
  ),
})
