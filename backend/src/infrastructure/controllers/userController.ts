import { Request, Response } from 'express';
import { UserService } from '../../application/services/userService';
import { FirestoreUserRepository } from '../../domain/repositories/firestoreUserRepository';

const userService = new UserService(new FirestoreUserRepository());

export const userController = {
  async getUserByEmail(req: Request, res: Response) {
    const { email } = req.params;
    const user = await userService.findByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    return res.json(user);
  },

  async createUser(req: Request, res: Response) {
    const { email } = req.body;
    let user = await userService.findByEmail(email);
    if (user) {
      return res.status(200).json(user);
    }
    user = await userService.create(email);
    return res.status(201).json(user);
  }
};
