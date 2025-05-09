import { Task } from '../../domain/entities/task';
import { TaskRepository } from '../../domain/repositories/taskRepository';
import { CreateTaskDto, UpdateTaskDto } from '../../domain/dtos/taskDto';

export class TaskUseCases {
  constructor(private readonly taskRepository: TaskRepository) {}

  async getAllTasks(): Promise<Task[]> {
    return this.taskRepository.getAllTasks();
  }

  async createTask(taskData: CreateTaskDto): Promise<Task> {
    const task = Task.create(taskData.title, taskData.description);
    return this.taskRepository.createTask(task);
  }

  async updateTask(id: string, taskData: UpdateTaskDto): Promise<Task | null> {
    const existingTask = await this.taskRepository.getTaskById(id);
    if (!existingTask) return null;

    const updatedTask = existingTask.update(taskData);
    return this.taskRepository.updateTask(id, updatedTask);
  }

  async deleteTask(id: string): Promise<boolean> {
    return this.taskRepository.deleteTask(id);
  }
} 