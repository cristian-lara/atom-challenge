import { Request, Response } from 'express';
import { TaskService } from '../../application/services/taskService';
import { FirestoreTaskRepository } from '../../domain/repositories/firestoreTaskRepository';
import { CreateTaskDto, UpdateTaskDto } from '../../domain/dtos/taskDto';

const taskRepository = new FirestoreTaskRepository();
const taskService = new TaskService(taskRepository);

export const taskController = {
  getAllTasks: async (req: Request, res: Response): Promise<void> => {
    try {
      console.log('[TaskController] Iniciando obtención de todas las tareas');
      const tasks = await taskService.getAllTasks();
      console.log(`[TaskController] Se obtuvieron ${tasks.length} tareas exitosamente`);
      res.json(tasks);
    } catch (error) {
      console.error('[TaskController] Error al obtener las tareas:', {
        error: error instanceof Error ? {
          name: error.name,
          message: error.message,
          stack: error.stack,
          code: (error as any).code,
          details: (error as any).details,
          metadata: (error as any).metadata
        } : error,
        timestamp: new Date().toISOString(),
        path: req.path,
        method: req.method
      });
      res.status(500).json({ 
        error: 'Error al obtener las tareas',
        details: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  },

  createTask: async (req: Request, res: Response): Promise<void> => {
    try {
      console.log('[TaskController] Iniciando creación de tarea:', req.body);
      const taskData = req.body as CreateTaskDto;
      const task = await taskService.createTask(taskData);
      console.log('[TaskController] Tarea creada exitosamente:', { id: task.id });
      res.status(201).json(task);
    } catch (error) {
      console.error('[TaskController] Error al crear la tarea:', {
        error: error instanceof Error ? {
          name: error.name,
          message: error.message,
          stack: error.stack,
          code: (error as any).code,
          details: (error as any).details,
          metadata: (error as any).metadata
        } : error,
        requestBody: req.body,
        timestamp: new Date().toISOString(),
        path: req.path,
        method: req.method
      });
      res.status(500).json({ 
        error: 'Error al crear la tarea',
        details: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  },

  updateTask: async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params['id'];
      console.log('[TaskController] Iniciando actualización de tarea:', { id, updates: req.body });
      const taskData = req.body as UpdateTaskDto;
      const task = await taskService.updateTask(id, taskData);
      if (!task) {
        console.log('[TaskController] Tarea no encontrada:', { id });
        res.status(404).json({ error: 'Tarea no encontrada' });
        return;
      }
      console.log('[TaskController] Tarea actualizada exitosamente:', { id });
      res.json(task);
    } catch (error) {
      console.error('[TaskController] Error al actualizar la tarea:', {
        error: error instanceof Error ? {
          name: error.name,
          message: error.message,
          stack: error.stack,
          code: (error as any).code,
          details: (error as any).details,
          metadata: (error as any).metadata
        } : error,
        taskId: req.params['id'],
        requestBody: req.body,
        timestamp: new Date().toISOString(),
        path: req.path,
        method: req.method
      });
      res.status(500).json({ 
        error: 'Error al actualizar la tarea',
        details: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  },

  deleteTask: async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params['id'];
      console.log('[TaskController] Iniciando eliminación de tarea:', { id });
      const success = await taskService.deleteTask(id);
      if (!success) {
        console.log('[TaskController] Tarea no encontrada para eliminar:', { id });
        res.status(404).json({ error: 'Tarea no encontrada' });
        return;
      }
      console.log('[TaskController] Tarea eliminada exitosamente:', { id });
      res.status(204).send();
    } catch (error) {
      console.error('[TaskController] Error al eliminar la tarea:', {
        error: error instanceof Error ? {
          name: error.name,
          message: error.message,
          stack: error.stack,
          code: (error as any).code,
          details: (error as any).details,
          metadata: (error as any).metadata
        } : error,
        taskId: req.params['id'],
        timestamp: new Date().toISOString(),
        path: req.path,
        method: req.method
      });
      res.status(500).json({ 
        error: 'Error al eliminar la tarea',
        details: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  }
}; 