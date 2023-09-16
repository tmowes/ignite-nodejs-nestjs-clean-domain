import { z } from 'zod'

import { authenticateBodySchema } from './schemas'

export type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>
