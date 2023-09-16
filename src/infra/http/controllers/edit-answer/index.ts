import { EditAnswerUseCase } from '@domains/forum/application/use-cases/edit-answer'
import { CurrentUser } from '@infra/auth/current-user-decorator'
import { UserPayload } from '@infra/auth/jwt.strategy'
import { Put, HttpCode, Body, Param, BadRequestException, Controller } from '@nestjs/common'

import { bodyValidationPipe } from './schema'
import { EditAnswerBodySchema } from './types'

@Controller('/answers/:id')
export class EditAnswerController {
  constructor(private editAnswer: EditAnswerUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditAnswerBodySchema,
    @CurrentUser() user: UserPayload,
    @Param('id') answerId: string,
  ) {
    const { content } = body
    const userId = user.sub

    const result = await this.editAnswer.execute({
      content,
      authorId: userId,
      attachmentsIds: [],
      answerId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
