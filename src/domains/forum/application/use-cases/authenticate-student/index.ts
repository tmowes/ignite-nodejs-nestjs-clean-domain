import { left, right } from '@core/entities/either'
import { WrongCredentialsError } from '@core/errors/wrong-credentials-error'
import { Injectable } from '@nestjs/common'

import { HashComparer } from '../../cryptography/hash-comparer'
import { StudentsRepository } from '../../repositories/students-repository'
import { AuthenticateStudentUseCaseRequest, AuthenticateStudentUseCaseResponse } from './types'
import { Encryptor } from '../../cryptography/encryptor'

@Injectable()
export class AuthenticateStudentUseCase {
  constructor(
    private studentsRepository: StudentsRepository,
    private hashComparer: HashComparer,
    private encryptor: Encryptor,
  ) {}

  async execute(props: AuthenticateStudentUseCaseRequest): Promise<AuthenticateStudentUseCaseResponse> {
    const { email, password } = props
    const student = await this.studentsRepository.findByEmail(email)

    if (!student) {
      return left(new WrongCredentialsError())
    }

    const isPasswordValid = await this.hashComparer.compare(password, student.password)

    if (!isPasswordValid) {
      return left(new WrongCredentialsError())
    }

    const accessToken = await this.encryptor.encrypt({ sub: student.id.toString() })

    return right({ accessToken })
  }
}
