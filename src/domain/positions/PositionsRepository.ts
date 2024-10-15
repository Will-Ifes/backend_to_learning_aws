import prisma from '../../infrastructure/prisma/PrismaClient';
import { Positions } from '@prisma/client';

export class PositionsRepository {
  async getAll(): Promise<Positions[]> {
    return await prisma.positions.findMany();
  }

  async getById(id: number): Promise<Positions | null> {
    return await prisma.positions.findUnique({
      where: { id },
    });
  }

  async create(data: Omit<Positions, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<Positions> {
    return await prisma.positions.create({
      data,
    });
  }

  async update(id: number, data: Partial<Omit<Positions, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>>): Promise<Positions> {
    return await prisma.positions.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<Positions> {
    return await prisma.positions.delete({
      where: { id },
    });
  }
}