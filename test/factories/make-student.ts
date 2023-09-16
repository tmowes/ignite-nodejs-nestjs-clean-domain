import { UniqueEntityID } from '@core/entities/unique-entity-id'
import { Student } from '@domains/forum/enterprise/entities/student'
import { StudentProps } from '@domains/forum/enterprise/entities/student/types'
import { faker } from '@faker-js/faker'
import { PrismaStudentMapper } from '@infra/database/prisma/mappers/prisma-student-mapper'
import { PrismaService } from '@infra/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

export function makeStudent(
  override: Partial<StudentProps> = {},
  id: UniqueEntityID | undefined = undefined,
) {
  return Student.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...override,
    },
    id,
  )
}

@Injectable()
export class StudentFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaStudent(data: Partial<StudentProps> = {}): Promise<Student> {
    const student = makeStudent(data)
    await this.prisma.user.create({ data: PrismaStudentMapper.toPrisma(student) })
    return student
  }
}
