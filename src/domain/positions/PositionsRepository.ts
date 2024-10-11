import prisma from '../../infrastructure/prisma/PrismaClient';
import { Positions } from '@prisma/client';
import { encrypt, decrypt } from '../../infrastructure/crypto/crypto';

export class PositionsRepository {
  async getAll(): Promise<Positions[]> {
    const positions = await prisma.positions.findMany();
    return positions.map(position => ({
      ...position,
      name: decrypt(position.name),
    }));
  }

  async getById(id: number): Promise<Positions | null> {
    const position = await prisma.positions.findUnique({
      where: { id },
    });
    if (position) {
      position.name = decrypt(position.name);
    }
    return position;
  }

  async create(data: Omit<Positions, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<Positions> {
    const encryptedData = {
      ...data,
      name: encrypt(data.name),
    };
    return await prisma.positions.create({
      data: encryptedData,
    });
  }

  async update(id: number, data: Partial<Omit<Positions, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>>): Promise<Positions> {
    const encryptedData = {
      ...data,
      name: data.name ? encrypt(data.name) : undefined,
    };
    return await prisma.positions.update({
      where: { id },
      data: encryptedData,
    });
  }

  async delete(id: number): Promise<Positions> {
    return await prisma.positions.delete({
      where: { id },
    });
  }
}