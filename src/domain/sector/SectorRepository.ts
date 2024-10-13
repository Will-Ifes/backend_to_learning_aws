import prisma from '../../infrastructure/prisma/PrismaClient';
import { Sector } from '@prisma/client';

export class SectorRepository {
  async getAll(): Promise<Sector[]> {
    return await prisma.sector.findMany();
  }

  async getById(id: number): Promise<Sector | null> {
    return await prisma.sector.findUnique({
      where: { id },
    });
  }

  async create(data: Omit<Sector, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<Sector> {
    return await prisma.sector.create({
      data,
    });
  }

  async update(id: number, data: Partial<Omit<Sector, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>>): Promise<Sector> {
    return await prisma.sector.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<Sector> {
    return await prisma.sector.delete({
      where: { id },
    });
  }
}