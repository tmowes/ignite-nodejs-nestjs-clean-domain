import { ZodValidationPipe } from '@infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'

export const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})

export const bodyValidationPipe = new ZodValidationPipe(createAccountBodySchema)
