import { Controller, BadRequestException, Get, Query, Param } from '@nestjs/common'
import { FetchQuestionAnswersUseCase } from '@domains/forum/application/use-cases/fetch-question-answers'
import { AnswerPresenter } from '@infra/http/presenters/answer-presenter'

import { queryValidationPipe } from './schemas'
import { PageQueryParamSchema } from './types'

@Controller('/questions/:questionId/answers')
export class FetchQuestionAnswersController {
  constructor(private fetchQuestionAnswers: FetchQuestionAnswersUseCase) {}

  @Get()
  async handle(
    @Query('page', queryValidationPipe) page: PageQueryParamSchema,
    @Param('questionId') questionId: string,
  ) {
    const result = await this.fetchQuestionAnswers.execute({ page, questionId })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const { answers } = result.value

    return { answers: answers.map(AnswerPresenter.toHTTP) }
  }
}
