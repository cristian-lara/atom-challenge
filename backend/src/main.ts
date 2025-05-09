import express from 'express';
import * as functions from 'firebase-functions';
import { taskController } from './infrastructure/controllers/taskController';
import { validateDto } from './infrastructure/middlewares/validationMiddleware';
import { CreateTaskDto, UpdateTaskDto } from './domain/dtos/taskDto';

const app = express();

app.use(express.json());

app.get('/tasks', taskController.getAllTasks);
app.post('/tasks', validateDto(CreateTaskDto), taskController.createTask);
app.put('/tasks/:id', validateDto(UpdateTaskDto), taskController.updateTask);
app.delete('/tasks/:id', taskController.deleteTask);

export const api = functions.https.onRequest(app);