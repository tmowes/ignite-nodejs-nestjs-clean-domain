import { left, right } from '@core/entities/either'
import { StudentAlreadyExistsError } from '@core/errors/student-already-exists-error'
import { Student } from '@domains/forum/enterprise/entities/student'
import { Injectable } from '@nestjs/common'

import { HashGenerator } from '../../cryptography/hash-generator'
import { StudentsRepository } from '../../repositories/students-repository'
import { RegisterStudentUseCaseRequest, RegisterStudentUseCaseResponse } from './types'

@Injectable()
export class RegisterStudentUseCase {
  constructor(private studentsRepository: StudentsRepository, private hashGenerator: HashGenerator) {}

  async execute(props: RegisterStudentUseCaseRequest): Promise<RegisterStudentUseCaseResponse> {
    const { name, email, password } = props
    const studentWithSameEmail = await this.studentsRepository.findByEmail(email)

    if (studentWithSameEmail) {
      return left(new StudentAlreadyExistsError(email))
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const student = Student.create({ name, email, password: hashedPassword })

    await this.studentsRepository.create(student)

    return right({ student })
  }
}
