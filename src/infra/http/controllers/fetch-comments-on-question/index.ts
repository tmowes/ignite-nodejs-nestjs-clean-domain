import { Controller, BadRequestException, Get, Query, Param } from '@nestjs/common'
import { CommentPresenter } from '@infra/http/presenters/comment-presenter'
import { FetchCommentsOnQuestionUseCase } from '@domains/forum/application/use-cases/fetch-comments-on-question'
import { CommentWithAuthorPresenter } from '@infra/http/presenters/comment-with-author-presenter'

import { queryValidationPipe } from './schemas'
import { PageQueryParamSchema } from './types'

@Controller('/questions/:questionId/comments')
export class FetchCommentsOnQuestionController {
  constructor(private fetchQuestionComments: FetchCommentsOnQuestionUseCase) {}

  @Get()
  async handle(
    @Query('page', queryValidationPipe) page: PageQueryParamSchema,
    @Param('questionId') questionId: string,
  ) {
    const result = await this.fetchQuestionComments.execute({
      page,
      questionId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const { comments } = result.value

    return { comments: comments.map(CommentWithAuthorPresenter.toHTTP) }
  }
}
