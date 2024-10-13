import prisma from '../../infrastructure/prisma/PrismaClient';
import { User } from '@prisma/client';
import { encrypt, decrypt } from '../../infrastructure/crypto/crypto';

const isEncryptedFormat = (text: string): boolean => {
  return text.includes(':');
};

export class UserRepository {
  async getAll(): Promise<User[]> {
    try {
      const users = await prisma.user.findMany();
      return users.map(user => ({
        ...user,
        email: isEncryptedFormat(user.email) ? decrypt(user.email) : user.email,
        password: isEncryptedFormat(user.password) ? decrypt(user.password) : user.password,
        name: isEncryptedFormat(user.name) ? decrypt(user.name) : user.name,
      }));
    } catch (error) {
      console.error('Error in getAll:', error);
      throw error;
    }
  }

  async getById(id: number): Promise<User | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
      });
      if (user) {
        user.email = isEncryptedFormat(user.email) ? decrypt(user.email) : user.email;
        user.password = isEncryptedFormat(user.password) ? decrypt(user.password) : user.password;
        user.name = isEncryptedFormat(user.name) ? decrypt(user.name) : user.name;
      }
      return user;
    } catch (error) {
      console.error('Error in getById:', error);
      throw error;
    }
  }

  async create(data: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<User> {
    try {
      const encryptedData = {
        ...data,
        email: encrypt(data.email),
        password: encrypt(data.password),
        name: encrypt(data.name),
      };
      const createdUser = await prisma.user.create({
        data: encryptedData,
      });
      return {
        ...createdUser,
        email: decrypt(createdUser.email),
        password: decrypt(createdUser.password),
        name: decrypt(createdUser.name),
      };
    } catch (error) {
      console.error('Error in create:', error);
      throw error;
    }
  }

  async update(id: number, data: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>>): Promise<User> {
    try {
      const encryptedData = {
        ...data,
        email: data.email ? encrypt(data.email) : undefined,
        password: data.password ? encrypt(data.password) : undefined,
        name: data.name ? encrypt(data.name) : undefined,
      };
      const updatedUser = await prisma.user.update({
        where: { id },
        data: encryptedData,
      });
      return {
        ...updatedUser,
        email: decrypt(updatedUser.email),
        password: decrypt(updatedUser.password),
        name: decrypt(updatedUser.name),
      };
    } catch (error) {
      console.error('Error in update:', error);
      throw error;
    }
  }

  async delete(id: number): Promise<User> {
    try {
      const deletedUser = await prisma.user.delete({
        where: { id },
      });
      return {
        ...deletedUser,
        email: decrypt(deletedUser.email),
        password: decrypt(deletedUser.password),
        name: decrypt(deletedUser.name),
      };
    } catch (error) {
      console.error('Error in delete:', error);
      throw error;
    }
  }
}