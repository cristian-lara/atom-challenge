import { User as IUser } from '@atom-challenge/shared';

export class User implements IUser {
  constructor(
    public email: string,
    public createdAt: string = new Date().toISOString()
  ) {}
} 