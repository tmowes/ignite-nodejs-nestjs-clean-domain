import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { UniqueEntityID } from '@core/entities/unique-entity-id'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository'
import { makeStudent } from 'test/factories/make-student'

import { FetchCommentsOnQuestionUseCase } from '.'

let inMemoryStudentsRepository: InMemoryStudentsRepository
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: FetchCommentsOnQuestionUseCase

const questionId = new UniqueEntityID('question-1')

describe('Fetch Comments On Question', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository(
      inMemoryStudentsRepository,
    )
    sut = new FetchCommentsOnQuestionUseCase(inMemoryQuestionCommentsRepository)
  })

  it('should be able to fetch comments on question', async () => {
    const student = makeStudent({ name: 'John Doe' })

    inMemoryStudentsRepository.items.push(student)

    const comment1 = makeQuestionComment({
      questionId: new UniqueEntityID('question-1'),
      authorId: student.id,
    })

    const comment2 = makeQuestionComment({
      questionId: new UniqueEntityID('question-1'),
      authorId: student.id,
    })

    const comment3 = makeQuestionComment({
      questionId: new UniqueEntityID('question-1'),
      authorId: student.id,
    })

    await Promise.all([
      inMemoryQuestionCommentsRepository.create(comment1),
      inMemoryQuestionCommentsRepository.create(comment2),
      inMemoryQuestionCommentsRepository.create(comment3),
    ])

    const { value } = await sut.execute({ questionId: questionId.toString(), page: 1 })

    expect(value?.comments).toHaveLength(3)
    expect(value?.comments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ author: 'John Doe', commentId: comment1.id }),
        expect.objectContaining({ author: 'John Doe', commentId: comment2.id }),
        expect.objectContaining({ author: 'John Doe', commentId: comment3.id }),
      ]),
    )
  })

  it('should not be able to delete a comment on question from another user', async () => {
    const student = makeStudent({ name: 'John Doe' })

    inMemoryStudentsRepository.items.push(student)

    await Promise.all([
      new Array(22)
        .fill(null)
        .map(() =>
          inMemoryQuestionCommentsRepository.create(
            makeQuestionComment({ questionId, authorId: student.id }),
          ),
        ),
    ])

    const { value } = await sut.execute({ questionId: questionId.toString(), page: 2 })

    expect(value?.comments).toHaveLength(2)
  })
})
