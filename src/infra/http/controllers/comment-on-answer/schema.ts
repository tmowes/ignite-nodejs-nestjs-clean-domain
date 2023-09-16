import { z } from 'zod'
import { ZodValidationPipe } from '@infra/http/pipes/zod-validation-pipe'

export const commentOnAnswerBodySchema = z.object({ content: z.string() })

export const bodyValidationPipe = new ZodValidationPipe(commentOnAnswerBodySchema)
