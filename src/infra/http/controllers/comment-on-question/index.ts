import { CurrentUser } from '@infra/auth/current-user-decorator'
import { UserPayload } from '@infra/auth/jwt.strategy'
import { Body, Param, BadRequestException, Controller, Post } from '@nestjs/common'
import { CommentOnQuestionUseCase } from '@domains/forum/application/use-cases/comment-on-question'

import { bodyValidationPipe } from './schema'
import { CommentOnQuestionBodySchema } from './types'

@Controller('/questions/:questionId/comments')
export class CommentOnQuestionController {
  constructor(private commentOnQuestion: CommentOnQuestionUseCase) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CommentOnQuestionBodySchema,
    @CurrentUser() user: UserPayload,
    @Param('questionId') questionId: string,
  ) {
    const { content } = body

    const result = await this.commentOnQuestion.execute({
      content,
      questionId,
      authorId: user.sub,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
