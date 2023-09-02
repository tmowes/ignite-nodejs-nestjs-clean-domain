import { CurrentUser } from '@infra/auth/current-user-decorator'
import { JwtAuthGuard } from '@infra/auth/jwt-auth.guard'
import { UserPayload } from '@infra/auth/jwt.strategy'
import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { CreateQuestionUseCase } from '@domains/forum/application/use-cases/create-question'
import { z } from 'zod'

import { ZodValidationPipe } from '../pipes/zod-validation-pipe'

const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(createQuestionBodySchema)

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(private createQuestion: CreateQuestionUseCase) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CreateQuestionBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { title, content } = body
    const userId = user.sub

    await this.createQuestion.execute({
      authorId: userId,
      title,
      content,
      attachmentsIds: [],
    })
  }
}