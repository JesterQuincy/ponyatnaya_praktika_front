import { z } from 'zod'

const ns = z
  .string()
  .nullish()
  .transform((v) => v ?? '')

export const meetingSchema = z.object({
  clientSessionRequest: ns,
  therapistStateAtSessionStart: ns,
  mainTopicsDiscussedDuringSession: ns,
  clientKeyPhrasesInsights: ns,
  clientMainEmotions: ns,
  therapistMainEmotionsExpressed: ns,
  techniquesAndMethodsUsed: ns,
  clientMainObstaclesMethods: ns,
  note: ns,
})

// Типы:
export type FormIn = z.input<typeof meetingSchema> // string | null | undefined
export type FormOut = z.output<typeof meetingSchema> // string
