import { DomainEvents } from '@core/events/domain-events'
import { StudentsRepository } from '@domains/forum/application/repositories/students-repository'
import { Student } from '@domains/forum/enterprise/entities/student'

export class InMemoryStudentsRepository implements StudentsRepository {
  public items: Student[] = []

  async findByEmail(email: string) {
    return this.items.find((item) => item.email === email) ?? null
  }

  async create(student: Student) {
    this.items.push(student)

    DomainEvents.dispatchEventsForAggregate(student.id)
  }
}
