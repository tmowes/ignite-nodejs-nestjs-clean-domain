import { DeleteCommentOnQuestionUseCase } from '@domains/forum/application/use-cases/delete-comment-on-question'
import { CurrentUser } from '@infra/auth/current-user-decorator'
import { UserPayload } from '@infra/auth/jwt.strategy'
import { Param, BadRequestException, Controller, Delete, HttpCode } from '@nestjs/common'

@Controller('/questions/comments/:id')
export class DeleteCommentOnQuestionController {
  constructor(private deleteQuestionComment: DeleteCommentOnQuestionUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(@CurrentUser() user: UserPayload, @Param('id') questionCommentId: string) {
    const result = await this.deleteQuestionComment.execute({ questionCommentId, authorId: user.sub })
    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
