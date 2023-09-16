import { DeleteCommentOnAnswerUseCase } from '@domains/forum/application/use-cases/delete-comment-on-answer'
import { CurrentUser } from '@infra/auth/current-user-decorator'
import { UserPayload } from '@infra/auth/jwt.strategy'
import { Param, BadRequestException, Controller, Delete, HttpCode } from '@nestjs/common'

@Controller('/answers/comments/:id')
export class DeleteCommentOnAnswerController {
  constructor(private deleteAnswerComment: DeleteCommentOnAnswerUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(@CurrentUser() user: UserPayload, @Param('id') answerCommentId: string) {
    const userId = user.sub

    const result = await this.deleteAnswerComment.execute({
      answerCommentId,
      authorId: userId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
