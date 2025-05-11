import { Task } from '../../domain/entities/task';
import { TaskRepository } from './taskRepository';
import { getFirestore } from 'firebase-admin/firestore';
import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    console.log('[FirestoreTaskRepository] Inicializando Firebase Admin');
    admin.initializeApp();
    console.log('[FirestoreTaskRepository] Firebase Admin inicializado exitosamente');
  } catch (error) {
    console.error('[FirestoreTaskRepository] Error al inicializar Firebase Admin:', {
      error: error instanceof Error ? {
        name: error.name,
        message: error.message,
        stack: error.stack,
        code: (error as any).code
      } : error
    });
    throw error;
  }
}

try {
  console.log('[FirestoreTaskRepository] Obteniendo instancia de Firestore');
  const db = getFirestore();
  console.log('[FirestoreTaskRepository] Instancia de Firestore obtenida exitosamente');
  const collection = db.collection('tasks');
} catch (error) {
  console.error('[FirestoreTaskRepository] Error al obtener instancia de Firestore:', {
    error: error instanceof Error ? {
      name: error.name,
      message: error.message,
      stack: error.stack,
      code: (error as any).code
    } : error
  });
  throw error;
}

const db = getFirestore();
const collection = db.collection('tasks');

function toTask(id: string, data: any): Task {
  try {
    return new Task(
      id,
      data.title,
      data.description,
      data.completed,
      data.createdAt ?? new Date().toISOString(),
      data.updatedAt ?? new Date().toISOString()
    );
  } catch (error) {
    console.error('[FirestoreTaskRepository] Error al convertir datos a Task:', {
      error: error instanceof Error ? {
        name: error.name,
        message: error.message,
        stack: error.stack
      } : error,
      id,
      data
    });
    throw error;
  }
}

export class FirestoreTaskRepository implements TaskRepository {
  async getAllTasks(): Promise<Task[]> {
    try {
      console.log('[FirestoreTaskRepository] Obteniendo todas las tareas');
      const snapshot = await collection.get();
      console.log(`[FirestoreTaskRepository] Se obtuvieron ${snapshot.docs.length} tareas`);
      return snapshot.docs.map(doc => toTask(doc.id, doc.data()));
    } catch (error) {
      console.error('[FirestoreTaskRepository] Error al obtener todas las tareas:', {
        error: error instanceof Error ? {
          name: error.name,
          message: error.message,
          stack: error.stack,
          code: (error as any).code,
          details: (error as any).details,
          metadata: (error as any).metadata
        } : error
      });
      throw error;
    }
  }

  async getTaskById(id: string): Promise<Task | null> {
    try {
      console.log('[FirestoreTaskRepository] Obteniendo tarea por ID:', { id });
      const doc = await collection.doc(id).get();
      if (!doc.exists) {
        console.log('[FirestoreTaskRepository] Tarea no encontrada:', { id });
        return null;
      }
      console.log('[FirestoreTaskRepository] Tarea encontrada:', { id });
      return toTask(doc.id, doc.data());
    } catch (error) {
      console.error('[FirestoreTaskRepository] Error al obtener tarea por ID:', {
        error: error instanceof Error ? {
          name: error.name,
          message: error.message,
          stack: error.stack,
          code: (error as any).code,
          details: (error as any).details,
          metadata: (error as any).metadata
        } : error,
        id
      });
      throw error;
    }
  }

  async createTask(task: Task): Promise<Task> {
    const docRef = await collection.add({
      title: task.title,
      description: task.description,
      completed: task.completed,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt
    });
    return new Task(
      docRef.id,
      task.title,
      task.description,
      task.completed,
      task.createdAt,
      task.updatedAt
    );
  }

  async updateTask(id: string, updates: Partial<Task>): Promise<Task | null> {
    const docRef = collection.doc(id);
    const doc = await docRef.get();
    if (!doc.exists) return null;
    const data = doc.data();
    const updatedData = {
      ...data,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    await docRef.update(updatedData);
    return toTask(id, updatedData);
  }

  async deleteTask(id: string): Promise<boolean> {
    const docRef = collection.doc(id);
    const doc = await docRef.get();
    if (!doc.exists) return false;
    await docRef.delete();
    return true;
  }
}