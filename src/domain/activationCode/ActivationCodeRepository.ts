import prisma from '../../infrastructure/prisma/PrismaClient';
import { ActivationCode } from '@prisma/client';
import { encrypt, decrypt } from '../../infrastructure/crypto/crypto';

export class ActivationCodeRepository {
  async getAll(): Promise<ActivationCode[]> {
    const activationCodes = await prisma.activationCode.findMany();
    return activationCodes.map(activationCode => ({
      ...activationCode,
      code: decrypt(activationCode.code),
    }));
  }

  async getById(id: number): Promise<ActivationCode | null> {
    const activationCode = await prisma.activationCode.findUnique({
      where: { id },
    });
    if (activationCode) {
      activationCode.code = decrypt(activationCode.code);
    }
    return activationCode;
  }

  async create(data: Omit<ActivationCode, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<ActivationCode> {
    const encryptedData = {
      ...data,
      code: encrypt(data.code),
    };
    return await prisma.activationCode.create({
      data: encryptedData,
    });
  }

  async update(id: number, data: Partial<Omit<ActivationCode, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>>): Promise<ActivationCode> {
    const encryptedData = {
      ...data,
      code: data.code ? encrypt(data.code) : undefined,
    };
    return await prisma.activationCode.update({
      where: { id },
      data: encryptedData,
    });
  }

  async delete(id: number): Promise<ActivationCode> {
    return await prisma.activationCode.delete({
      where: { id },
    });
  }
}