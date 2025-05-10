import { UserRepository } from '../../domain/repositories/userRepository';
import { User } from '../../domain/entities/user';
import * as admin from 'firebase-admin';

const COLLECTION = 'users';

export class FirestoreUserRepository implements UserRepository {
  private db: FirebaseFirestore.Firestore;

  constructor() {
    if (!admin.apps.length) {
      admin.initializeApp();
    }
    this.db = admin.firestore();
  }

  async findByEmail(email: string): Promise<User | null> {
    const doc = await this.db.collection(COLLECTION).doc(email).get();
    if (!doc.exists) return null;
    const data = doc.data();
    return new User(data!.email, data!.createdAt.toDate ? data!.createdAt.toDate() : new Date(data!.createdAt));
  }

  async create(user: User): Promise<User> {
    await this.db.collection(COLLECTION).doc(user.email).set({
      email: user.email,
      createdAt: user.createdAt
    });
    return user;
  }
} 