import express, { Request, Response, NextFunction } from 'express';
import * as functions from 'firebase-functions';
import cors from 'cors';
import { taskController } from './infrastructure/controllers/taskController';
import { validateDto } from './infrastructure/middlewares/validationMiddleware';
import { CreateTaskDto, UpdateTaskDto } from './domain/dtos/taskDto';
import { userController } from './infrastructure/controllers/userController';
import { CreateUserDto } from './domain/dtos/userDto';

const app = express();
// TODO: Cambiar a variables de entorno
const allowedOrigins = [
  'http://localhost:4200',
  'https://atom-challenge.web.app',  
  'https://atom-challenge.firebaseapp.com'  
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'La política CORS no permite el acceso desde este origen.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  credentials: true,
  maxAge: 86400, // 24 horas
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err.message.includes('CORS')) {
    return res.status(403).json({
      status: 'error',
      message: err.message
    });
  }
  next(err);
});

app.use(express.json());

app.get('/tasks', taskController.getAllTasks);
app.post('/tasks', validateDto(CreateTaskDto), taskController.createTask);
app.put('/tasks/:id', validateDto(UpdateTaskDto), taskController.updateTask);
app.delete('/tasks/:id', taskController.deleteTask);
app.get('/users/:email', userController.getUserByEmail);
app.post('/users', validateDto(CreateUserDto), userController.createUser);

export const api = functions.https.onRequest(app);