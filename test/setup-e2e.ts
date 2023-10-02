import { config } from 'dotenv'
import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { execSync } from 'node:child_process'
import { DomainEvents } from '@core/events/domain-events'
import { Redis } from 'ioredis'
import { envSchema } from '@infra/env'

config({ path: '.env', override: true })
config({ path: '.env.test', override: true })

const env = envSchema.parse(process.env)

const prisma = new PrismaClient()
const redis = new Redis({
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  db: env.REDIS_DB,
})

function generateUniqueDatabaseURL(schemaId: string) {
  if (!env.DATABASE_URL) {
    throw new Error('Please provider a DATABASE_URL environment variable')
  }

  if (env.DATABASE_URL.startsWith('file:')) {
    // databases.push(schemaId)
    return `file:./test/${schemaId}.db`
  }

  const url = new URL(env.DATABASE_URL)

  url.searchParams.set('schema', schemaId)

  return url.toString()
}

const schemaId = randomUUID()
// const databases: string[] = []

beforeAll(async () => {
  const databaseURL = generateUniqueDatabaseURL(schemaId)

  env.DATABASE_URL = databaseURL

  DomainEvents.shouldRun = false

  await redis.flushdb()

  execSync('pnpm prisma migrate deploy')
})

afterAll(async () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  if (!env.DATABASE_URL.startsWith('file:')) {
    await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`)
  }
  await prisma.$disconnect()
  // databases.forEach((database) => {
  //   execSync(`del /s /q prisma\\test\\${database}.db`)
  //   console.log(`Clearing database ${database}`)
  // })
})
