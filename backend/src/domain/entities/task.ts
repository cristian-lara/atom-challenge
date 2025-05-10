import { Task as ITask } from '@atom-challenge/shared';

export class Task implements ITask {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public completed: boolean,
    public createdAt: string = new Date().toISOString(),
    public updatedAt: string = new Date().toISOString()
  ) {}

  static create(title: string, description: string): Task {
    return new Task(
      Date.now().toString(),
      title,
      description,
      false,
      new Date().toISOString(),
      new Date().toISOString()
    );
  }

  markAsCompleted(): Task {
    return new Task(
      this.id,
      this.title,
      this.description,
      true,
      this.createdAt,
      new Date().toISOString()
    );
  }

  update(updates: Partial<Task>): Task {
    return new Task(
      this.id,
      updates.title ?? this.title,
      updates.description ?? this.description,
      updates.completed ?? this.completed,
      this.createdAt,
      new Date().toISOString()
    );
  }
} 