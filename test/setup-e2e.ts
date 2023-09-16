import 'dotenv/config'

import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { execSync } from 'node:child_process'

const prisma = new PrismaClient()

function generateUniqueDatabaseURL(schemaId: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provider a DATABASE_URL environment variable')
  }

  if (process.env.DATABASE_URL.startsWith('file:')) {
    databases.push(schemaId)
    return `file:./test/${schemaId}.db`
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schemaId)

  return url.toString()
}

const schemaId = randomUUID()
const databases: string[] = []

beforeAll(async () => {
  const databaseURL = generateUniqueDatabaseURL(schemaId)

  process.env.DATABASE_URL = databaseURL

  execSync('pnpm prisma migrate deploy')
})

afterAll(async () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  if (!process.env.DATABASE_URL!.startsWith('file:')) {
    await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`)
  }
  await prisma.$disconnect()
  databases.forEach((database) => {
    execSync(`del /s /q prisma\\test\\${database}.db`)
    console.log(`Clearing database ${database}`)
  })
}, 10000)
