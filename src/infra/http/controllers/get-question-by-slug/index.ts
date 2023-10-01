import { GetQuestionBySlugUseCase } from '@domains/forum/application/use-cases/get-question-by-slug'
import { QuestionDetailsPresenter } from '@infra/http/presenters/question-details-presenter'
import { Controller, Get, Param, BadRequestException } from '@nestjs/common'

@Controller('/questions/:slug')
export class GetQuestionBySlugController {
  constructor(private getQuestionBySlug: GetQuestionBySlugUseCase) {}

  @Get()
  async handle(@Param('slug') slug: string) {
    const result = await this.getQuestionBySlug.execute({ slug })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return { question: QuestionDetailsPresenter.toHTTP(result.value.question) }
  }
}
