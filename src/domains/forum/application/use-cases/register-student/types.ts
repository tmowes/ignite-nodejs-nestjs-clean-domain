import { Either } from '@core/entities/either'
import { Student } from '@domains/forum/enterprise/entities/student'
import { StudentAlreadyExistsError } from '@core/errors/student-already-exists-error'

export type RegisterStudentUseCaseRequest = {
  name: string
  email: string
  password: string
}

export type RegisterStudentUseCaseResponse = Either<
  StudentAlreadyExistsError,
  {
    student: Student
  }
>
