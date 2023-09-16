import { ZodValidationPipe } from '@infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'

export const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

export const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)
