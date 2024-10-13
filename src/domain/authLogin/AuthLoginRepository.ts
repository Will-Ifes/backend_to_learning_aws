import prisma from '../../infrastructure/prisma/PrismaClient';
import { User } from '@prisma/client';
import { encrypt, decrypt } from '../../infrastructure/crypto/crypto';

class AuthRepository {
  async findByEmail(email: string): Promise<User | null> {
    try {
      const encryptedEmail = encrypt(email);
      console.log("Encrypted email for search:", encryptedEmail);
      const user = await prisma.user.findFirst({
        where: { email: encryptedEmail },
      });
  
      console.log("User found:", user, encryptedEmail);
      if (user) {
        // Apenas descriptografa os campos necessários para exibição, mas não a senha
        user.email = decrypt(user.email);
        user.name = decrypt(user.name);
      }
      return user;
    } catch (error) {
      console.error('Error in findByEmail:', error);
      throw error;
    }
  } 

  async create(data: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<User> {
    try {
      // Verificar se o tenantId existe
      const tenantExists = await prisma.tenant.findUnique({
        where: { id: data.tenantId },
      });

      if (!tenantExists) {
        throw new Error('Tenant not found');
      }

      // Garantir que employeeId seja number | null
      const userData = {
        ...data,
        employeeId: data.employeeId ?? null,
        email: encrypt(data.email),
        password: data.password, // Não criptografar a senha aqui, pois ela será armazenada como hash
        name: encrypt(data.name),
      };

      console.log("User data to be created:", userData);
      const createdUser = await prisma.user.create({
        data: userData,
      });

      return createdUser; // Retornar os dados criptografados
    } catch (error) {
      console.error('Error in create:', error);
      throw error;
    }
  }
}

export default new AuthRepository();