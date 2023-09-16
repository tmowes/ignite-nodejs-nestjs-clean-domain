import { z } from 'zod'
import { ZodValidationPipe } from '@infra/http/pipes/zod-validation-pipe'

export const editQuestionBodySchema = z.object({ title: z.string(), content: z.string() })

export const bodyValidationPipe = new ZodValidationPipe(editQuestionBodySchema)
