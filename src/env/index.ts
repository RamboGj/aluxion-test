import { config } from 'dotenv'
import { z } from 'zod'


const envToRead = config()

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  MORALIS_API_KEY: z.string()
})

const _env = envSchema.safeParse(envToRead.parsed)

if (_env.success === false) {
  console.error('Invalid environment variables!', _env.error.format())

  throw new Error('Invalid environment variables.')
}

export const env = _env.data