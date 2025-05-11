import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { taskController } from './infrastructure/controllers/taskController';
import { validateDto } from './infrastructure/middlewares/validationMiddleware';
import { CreateTaskDto, UpdateTaskDto } from './domain/dtos/taskDto';
import { userController } from './infrastructure/controllers/userController';
import { CreateUserDto } from './domain/dtos/userDto';
import { onRequest } from 'firebase-functions/v2/https';

const app = express();
app.use(express.json());

app.get('/api/tasks', taskController.getAllTasks);
app.post('/api/tasks', validateDto(CreateTaskDto), taskController.createTask);
app.put('/api/tasks/:id', validateDto(UpdateTaskDto), taskController.updateTask);
app.delete('/api/tasks/:id', taskController.deleteTask);
app.get('/api/users/:email', userController.getUserByEmail);
app.post('/api/users', validateDto(CreateUserDto), userController.createUser);

export const api = onRequest(
  { timeoutSeconds: 300 },
  app
);