import {
  Body,
  Post,
  UsePipes,
  Controller,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common'
import { AuthenticateStudentUseCase } from '@domains/forum/application/use-cases/authenticate-student'
import { WrongCredentialsError } from '@core/errors/wrong-credentials-error'
import { Public } from '@infra/auth/public'

import { bodyValidationPipe } from './schemas'
import { AuthenticateBodySchema } from './types'

@Controller('/sessions')
@Public()
export class AuthenticateController {
  constructor(private authenticateStudent: AuthenticateStudentUseCase) {}

  @Post()
  @UsePipes(bodyValidationPipe)
  async handle(@Body() body: AuthenticateBodySchema) {
    const { email, password } = body

    const result = await this.authenticateStudent.execute({ email, password })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    return { access_token: result.value.accessToken }
  }
}
