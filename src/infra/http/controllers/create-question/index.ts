import { Body, Post, Controller, BadRequestException } from '@nestjs/common'
import { CreateQuestionUseCase } from '@domains/forum/application/use-cases/create-question'
import { CurrentUser } from '@infra/auth/current-user-decorator'
import { UserPayload } from '@infra/auth/jwt.strategy'

import { CreateQuestionBodySchema } from './types'
import { bodyValidationPipe } from './schemas'

@Controller('/questions')
export class CreateQuestionController {
  constructor(private createQuestion: CreateQuestionUseCase) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CreateQuestionBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { title, content, attachments } = body
    const userId = user.sub

    const { isLeft } = await this.createQuestion.execute({
      authorId: userId,
      title,
      content,
      attachmentsIds: attachments,
    })

    if (isLeft()) {
      throw new BadRequestException()
    }
  }
}
