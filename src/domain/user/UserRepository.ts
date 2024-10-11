import prisma from '../../infrastructure/prisma/PrismaClient';
import { User } from './User';
import { hashPassword } from '../../infrastructure/bcrypt/bcrypt';
import { encrypt, decrypt } from '../../infrastructure/crypto/crypto';

export class UserRepository {
  async create(data: User): Promise<User> {
    data.password = await hashPassword(data.password);
    data.name = encrypt(data.name);
    data.email = encrypt(data.email);
    return await prisma.user.create({
      data,
    });
  }

  async getById(id: number): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (user) {
      user.name = decrypt(user.name);
      user.email = decrypt(user.email);
    }
    return user;
  }

  // Outros métodos do repositório...
}