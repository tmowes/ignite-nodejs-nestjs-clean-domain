import { z } from 'zod'

import { pageQueryParamSchema } from './schemas'

export type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>
