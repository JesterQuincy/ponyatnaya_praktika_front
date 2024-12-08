import { z } from 'zod'

export const meetingSchema = z.object({
  clientSessionRequest: z.string().optional(),
  therapistStateAtSessionStart: z.string().optional(),
  mainTopicsDiscussedDuringSession: z.string().optional(),
  clientKeyPhrasesInsights: z.string().optional(),
  clientMainEmotions: z.string().optional(),
  therapistMainEmotionsExpressed: z.string().optional(),
  techniquesAndMethodsUsed: z.string().optional(),
  clientMainObstaclesMethods: z.string().optional(),
  note: z.string().optional(),
})

export type IMeetingSchema = z.infer<typeof meetingSchema>
