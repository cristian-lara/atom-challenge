import { Request, Response } from 'express';
import { TaskService } from '../../application/services/taskService';
import { FirestoreTaskRepository } from '../../domain/repositories/firestoreTaskRepository';
import { CreateTaskDto, UpdateTaskDto } from '../../domain/dtos/taskDto';

const taskRepository = new FirestoreTaskRepository();
const taskService = new TaskService(taskRepository);

export const taskController = {
  getAllTasks: async (req: Request, res: Response): Promise<void> => {
    try {
      const tasks = await taskService.getAllTasks();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las tareas' });
    }
  },

  createTask: async (req: Request, res: Response): Promise<void> => {
    try {
      const taskData = req.body as CreateTaskDto;
      const task = await taskService.createTask(taskData);
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear la tarea' });
    }
  },

  updateTask: async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params['id'];
      const taskData = req.body as UpdateTaskDto;
      const task = await taskService.updateTask(id, taskData);
      if (!task) {
        res.status(404).json({ error: 'Tarea no encontrada' });
        return;
      }
      res.json(task);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar la tarea' });
    }
  },

  deleteTask: async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params['id'];
      const success = await taskService.deleteTask(id);
      if (!success) {
        res.status(404).json({ error: 'Tarea no encontrada' });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar la tarea' });
    }
  }
}; 