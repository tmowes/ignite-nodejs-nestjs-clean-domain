import { GetQuestionBySlugUseCase } from '@domains/forum/application/use-cases/get-question-by-slug'
import { QuestionPresenter } from '@infra/http/presenters/question-presenter'
import { Controller, Get, Param, BadRequestException } from '@nestjs/common'

@Controller('/questions/:slug')
export class GetQuestionBySlugController {
  constructor(private getQuestionBySlug: GetQuestionBySlugUseCase) {}

  @Get()
  async handle(@Param('slug') slug: string) {
    const result = await this.getQuestionBySlug.execute({
      slug,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return { question: QuestionPresenter.toHTTP(result.value.question) }
  }
}
