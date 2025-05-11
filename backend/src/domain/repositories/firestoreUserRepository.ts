import { UserRepository } from './userRepository';
import { User } from '../entities/user';
import { getFirestore } from 'firebase-admin/firestore';
import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp();
}

const db = getFirestore();
const collection = db.collection('users');

function toUser(email: string, data: any): User {
  return new User(
    email,
    data.createdAt?.toDate ? data.createdAt.toDate() : new Date(data.createdAt)
  );
}

export class FirestoreUserRepository implements UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const doc = await collection.doc(email).get();
    if (!doc.exists) return null;
    return toUser(email, doc.data());
  }

  async create(user: User): Promise<User> {
    const userData = {
      email: user.email,
      createdAt: admin.firestore.Timestamp.fromDate(new Date(user.createdAt))
    };
    
    await collection.doc(user.email).set(userData);
    return user;
  }

  async update(email: string, updates: Partial<User>): Promise<User | null> {
    const docRef = collection.doc(email);
    const doc = await docRef.get();
    
    if (!doc.exists) return null;

    const updateData = {
      ...updates,
      updatedAt: admin.firestore.Timestamp.fromDate(new Date())
    };

    await docRef.update(updateData);
    const updatedDoc = await docRef.get();
    return toUser(email, updatedDoc.data());
  }

  async delete(email: string): Promise<boolean> {
    const docRef = collection.doc(email);
    const doc = await docRef.get();
    
    if (!doc.exists) return false;
    
    await docRef.delete();
    return true;
  }

  async findAll(): Promise<User[]> {
    const snapshot = await collection.get();
    return snapshot.docs.map(doc => toUser(doc.id, doc.data()));
  }

  async exists(email: string): Promise<boolean> {
    const doc = await collection.doc(email).get();
    return doc.exists;
  }
} 