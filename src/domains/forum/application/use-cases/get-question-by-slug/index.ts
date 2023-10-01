import { QuestionsRepository } from '@domains/forum/application/repositories/questions-repository'
import { left, right } from '@core/entities/either'
import { ResourceNotFoundError } from '@core/errors/resource-not-found'
import { Injectable } from '@nestjs/common'

import { GetQuestionBySlugUseCaseRequest, GetQuestionBySlugUseCaseResponse } from './types'

@Injectable()
export class GetQuestionBySlugUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({ slug }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
    const question = await this.questionsRepository.findDetailsBySlug(slug)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    return right({ question })
  }
}
