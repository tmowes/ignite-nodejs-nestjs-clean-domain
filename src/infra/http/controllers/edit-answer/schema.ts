import { z } from 'zod'
import { ZodValidationPipe } from '@infra/http/pipes/zod-validation-pipe'

export const editAnswerBodySchema = z.object({ content: z.string() })

export const bodyValidationPipe = new ZodValidationPipe(editAnswerBodySchema)
