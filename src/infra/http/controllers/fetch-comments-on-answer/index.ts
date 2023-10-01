import { Controller, BadRequestException, Get, Query, Param } from '@nestjs/common'
import { FetchCommentsOnAnswerUseCase } from '@domains/forum/application/use-cases/fetch-comments-on-answer'
import { CommentWithAuthorPresenter } from '@infra/http/presenters/comment-with-author-presenter'

import { queryValidationPipe } from './schemas'
import { PageQueryParamSchema } from './types'

@Controller('/answers/:answerId/comments')
export class FetchCommentsOnAnswerController {
  constructor(private fetchAnswerComments: FetchCommentsOnAnswerUseCase) {}

  @Get()
  async handle(
    @Query('page', queryValidationPipe) page: PageQueryParamSchema,
    @Param('answerId') answerId: string,
  ) {
    const result = await this.fetchAnswerComments.execute({ page, answerId })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const { comments } = result.value

    return { comments: comments.map(CommentWithAuthorPresenter.toHTTP) }
  }
}
