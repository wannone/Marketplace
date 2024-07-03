import { loginSchema } from '@server/src/schema/user-schema'
import { z } from 'Zod'

export type userLogin = z.infer<typeof loginSchema>