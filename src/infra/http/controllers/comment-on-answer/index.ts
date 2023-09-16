import { CurrentUser } from '@infra/auth/current-user-decorator'
import { UserPayload } from '@infra/auth/jwt.strategy'
import { Body, Param, BadRequestException, Controller, Post } from '@nestjs/common'
import { CommentOnAnswerUseCase } from '@domains/forum/application/use-cases/comment-on-answer'

import { bodyValidationPipe } from './schema'
import { CommentOnAnswerBodySchema } from './types'

@Controller('/answers/:answerId/comments')
export class CommentOnAnswerController {
  constructor(private commentOnAnswer: CommentOnAnswerUseCase) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CommentOnAnswerBodySchema,
    @CurrentUser() user: UserPayload,
    @Param('answerId') answerId: string,
  ) {
    const { content } = body
    const result = await this.commentOnAnswer.execute({ content, answerId, authorId: user.sub })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
