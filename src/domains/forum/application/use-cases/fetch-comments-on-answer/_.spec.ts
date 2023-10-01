import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { UniqueEntityID } from '@core/entities/unique-entity-id'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository'
import { makeStudent } from 'test/factories/make-student'
import { s } from 'vitest/dist/reporters-5f784f42'

import { FetchCommentsOnAnswerUseCase } from '.'

let inMemoryStudentsRepository: InMemoryStudentsRepository

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: FetchCommentsOnAnswerUseCase

const answerId = new UniqueEntityID('answer-1')

describe('Fetch Comments On Answer', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository(inMemoryStudentsRepository)
    sut = new FetchCommentsOnAnswerUseCase(inMemoryAnswerCommentsRepository)
  })

  it('should be able to fetch comments on answer', async () => {
    const student = makeStudent({ name: 'John Doe' })
    inMemoryStudentsRepository.items.push(student)

    const authorId = student.id

    const comment1 = makeAnswerComment({ answerId, authorId })
    const comment2 = makeAnswerComment({ answerId, authorId })
    const comment3 = makeAnswerComment({ answerId, authorId })

    await Promise.all([
      inMemoryAnswerCommentsRepository.create(comment1),
      inMemoryAnswerCommentsRepository.create(comment2),
      inMemoryAnswerCommentsRepository.create(comment3),
    ])

    const { value } = await sut.execute({ answerId: answerId.toString(), page: 1 })

    expect(value?.comments).toHaveLength(3)
    expect(value?.comments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ author: 'John Doe', commentId: comment1.id }),
        expect.objectContaining({ author: 'John Doe', commentId: comment2.id }),
        expect.objectContaining({ author: 'John Doe', commentId: comment3.id }),
      ]),
    )
  })

  it('should not be able to delete a comment on answer from another user', async () => {
    const student = makeStudent({ name: 'John Doe' })
    inMemoryStudentsRepository.items.push(student)

    await Promise.all([
      new Array(22)
        .fill(null)
        .map(() =>
          inMemoryAnswerCommentsRepository.create(
            makeAnswerComment({ answerId, authorId: student.id }),
          ),
        ),
    ])

    const { value } = await sut.execute({ answerId: answerId.toString(), page: 2 })

    expect(value?.comments).toHaveLength(2)
  })
})
