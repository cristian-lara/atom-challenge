import { Task } from '../../domain/entities/task';
import { TaskRepository } from '../../domain/repositories/taskRepository';
import { getFirestore } from 'firebase-admin/firestore';
import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp();
}

const db = getFirestore();
const collection = db.collection('tasks');

function toTask(id: string, data: any): Task {
  return new Task(
    id,
    data.title,
    data.description,
    data.completed,
    data.createdAt ?? new Date().toISOString(),
    data.updatedAt ?? new Date().toISOString()
  );
}

export class FirestoreTaskRepository implements TaskRepository {
  async getAllTasks(): Promise<Task[]> {
    const snapshot = await collection.get();
    return snapshot.docs.map(doc => toTask(doc.id, doc.data()));
  }

  async getTaskById(id: string): Promise<Task | null> {
    const doc = await collection.doc(id).get();
    if (!doc.exists) return null;
    return toTask(doc.id, doc.data());
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