import { Controller, BadRequestException, Get, Query, Param } from '@nestjs/common'
import { CommentPresenter } from '@infra/http/presenters/comment-presenter'
import { FetchCommentsOnAnswerUseCase } from '@domains/forum/application/use-cases/fetch-comments-on-answer'

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
    const result = await this.fetchAnswerComments.execute({
      page,
      answerId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const { answerComments } = result.value

    return { comments: answerComments.map(CommentPresenter.toHTTP) }
  }
}
