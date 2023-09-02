import { Either } from '@core/entities/either'
import { WrongCredentialsError } from '@core/errors/wrong-credentials-error'

export type AuthenticateStudentUseCaseRequest = {
  email: string
  password: string
}

export type AuthenticateStudentUseCaseResponse = Either<WrongCredentialsError, { accessToken: string }>
