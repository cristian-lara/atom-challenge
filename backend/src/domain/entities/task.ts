export class Task {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly completed: boolean,
    public readonly createdAt: Date = new Date(),
    public readonly updatedAt: Date = new Date()
  ) {}

  static create(title: string, description: string): Task {
    return new Task(
      Date.now().toString(),
      title,
      description,
      false,
      new Date(),
      new Date()
    );
  }

  markAsCompleted(): Task {
    return new Task(
      this.id,
      this.title,
      this.description,
      true,
      this.createdAt,
      new Date()
    );
  }

  update(updates: Partial<Task>): Task {
    return new Task(
      this.id,
      updates.title ?? this.title,
      updates.description ?? this.description,
      updates.completed ?? this.completed,
      this.createdAt,
      new Date()
    );
  }
} 