export class User {
  constructor(
    public email: string,
    public createdAt: Date = new Date()
  ) {}
} 