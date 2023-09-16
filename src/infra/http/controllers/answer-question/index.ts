import { CurrentUser } from '@infra/auth/current-user-decorator'
import { UserPayload } from '@infra/auth/jwt.strategy'
import { Body, Param, BadRequestException, Controller, Post } from '@nestjs/common'
import { AnswerQuestionUseCase } from '@domains/forum/application/use-cases/answer-question'

import { bodyValidationPipe } from './schema'
import { AnswerQuestionBodySchema } from './types'

@Controller('/questions/:questionId/answers')
export class AnswerQuestionController {
  constructor(private answerQuestion: AnswerQuestionUseCase) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: AnswerQuestionBodySchema,
    @CurrentUser() user: UserPayload,
    @Param('questionId') questionId: string,
  ) {
    const { content } = body
    const userId = user.sub

    const result = await this.answerQuestion.execute({
      content,
      questionId,
      authorId: userId,
      attachmentsIds: [],
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
