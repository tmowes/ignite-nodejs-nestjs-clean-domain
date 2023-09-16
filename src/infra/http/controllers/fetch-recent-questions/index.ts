import { Controller, BadRequestException, Get, Query } from '@nestjs/common'
import { FetchRecentQuestionsUseCase } from '@domains/forum/application/use-cases/fetch-recent-questions'
import { QuestionPresenter } from '@infra/http/presenters/question-presenter'

import { queryValidationPipe } from './schemas'
import { PageQueryParamSchema } from './types'

@Controller('/questions')
export class FetchRecentQuestionsController {
  constructor(private fetchRecentQuestions: FetchRecentQuestionsUseCase) {}

  @Get()
  async handle(@Query('page', queryValidationPipe) page: PageQueryParamSchema) {
    const result = await this.fetchRecentQuestions.execute({ page })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return { questions: result.value.questions.map(QuestionPresenter.toHTTP) }
  }
}
