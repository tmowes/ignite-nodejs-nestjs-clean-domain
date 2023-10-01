import { ZodValidationPipe } from '@infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'

export const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
  attachments: z.array(z.string().uuid()),
})

export const bodyValidationPipe = new ZodValidationPipe(createQuestionBodySchema)
