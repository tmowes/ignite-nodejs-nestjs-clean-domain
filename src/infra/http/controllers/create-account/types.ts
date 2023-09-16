import { z } from 'zod'

import { createAccountBodySchema } from './schemas'

export type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>
