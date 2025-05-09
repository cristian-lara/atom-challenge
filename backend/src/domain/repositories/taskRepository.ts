import { Task } from '../entities/task';

export interface TaskRepository {
  getAllTasks(): Promise<Task[]>;
  getTaskById(id: string): Promise<Task | null>;
  createTask(task: Task): Promise<Task>;
  updateTask(id: string, task: Partial<Task>): Promise<Task | null>;
  deleteTask(id: string): Promise<boolean>;
} 