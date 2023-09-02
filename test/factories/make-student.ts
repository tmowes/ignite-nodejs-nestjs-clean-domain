import { UniqueEntityID } from '@core/entities/unique-entity-id'
import { Student } from '@domains/forum/enterprise/entities/student'
import { StudentProps } from '@domains/forum/enterprise/entities/student/types'
import { faker } from '@faker-js/faker'

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
