import { Task } from '../../domain/entities/task';
import { TaskRepository } from '../../domain/repositories/taskRepository';

export class MemoryTaskRepository implements TaskRepository {
  private tasks: Task[] = [];

  async getAllTasks(): Promise<Task[]> {
    return [...this.tasks];
  }

  async getTaskById(id: string): Promise<Task | null> {
    const task = this.tasks.find(t => t.id === id);
    return task ? new Task(task.id, task.title, task.description, task.completed) : null;
  }

  async createTask(task: Task): Promise<Task> {
    this.tasks.push(task);
    return task;
  }

  async updateTask(id: string, task: Partial<Task>): Promise<Task | null> {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index === -1) return null;

    const updatedTask = new Task(
      id,
      task.title || this.tasks[index].title,
      task.description || this.tasks[index].description,
      task.completed ?? this.tasks[index].completed
    );

    this.tasks[index] = updatedTask;
    return updatedTask;
  }

  async deleteTask(id: string): Promise<boolean> {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index === -1) return false;

    this.tasks.splice(index, 1);
    return true;
  }
} 