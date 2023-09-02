import { QuestionsRepository } from '@domains/forum/application/repositories/questions-repository'
import { right } from '@core/entities/either'
import { Injectable } from '@nestjs/common'

import { FetchRecentQuestionsUseCaseRequest, FetchRecentQuestionsUseCaseResponse } from './types'

@Injectable()
export class FetchRecentQuestionsUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute(
    props: FetchRecentQuestionsUseCaseRequest,
  ): Promise<FetchRecentQuestionsUseCaseResponse> {
    const { page } = props
    const questions = await this.questionsRepository.findManyRecent({ page })

    return right({ questions })
  }
}
