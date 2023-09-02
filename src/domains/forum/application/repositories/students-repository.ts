import { Student } from '@domains/forum/enterprise/entities/student'

export abstract class StudentsRepository {
  abstract create(question: Student): Promise<void>

  abstract findByEmail(email: string): Promise<Student | null>
}
