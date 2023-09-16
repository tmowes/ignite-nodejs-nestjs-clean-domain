import {
  Body,
  Post,
  UsePipes,
  Controller,
  BadRequestException,
  ConflictException,
  HttpCode,
} from '@nestjs/common'
import { Public } from '@infra/auth/public'
import { StudentAlreadyExistsError } from '@core/errors/student-already-exists-error'
import { RegisterStudentUseCase } from '@domains/forum/application/use-cases/register-student'

import { bodyValidationPipe } from './schemas'
import { CreateAccountBodySchema } from './types'

@Controller('/accounts')
@Public()
export class CreateAccountController {
  constructor(private registerStudent: RegisterStudentUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(bodyValidationPipe)
  async handle(@Body() body: CreateAccountBodySchema) {
    const { name, email, password } = body

    const result = await this.registerStudent.execute({ name, email, password })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case StudentAlreadyExistsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
