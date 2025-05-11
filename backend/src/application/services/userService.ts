import { UserRepository } from '../../domain/repositories/userRepository';
import { User } from '../../domain/entities/user';

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async create(email: string): Promise<User> {
    const user = new User(email);
    return this.userRepository.create(user);
  }
} 