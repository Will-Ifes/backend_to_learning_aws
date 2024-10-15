import prisma from '../../infrastructure/prisma/PrismaClient';
import { Manufacturer } from '@prisma/client';

export class ManufacturerRepository {
  async getAll(): Promise<Manufacturer[]> {
    return await prisma.manufacturer.findMany();
  }

  async getById(id: number): Promise<Manufacturer | null> {
    return await prisma.manufacturer.findUnique({
      where: { id },
    });
  }

  async create(data: Omit<Manufacturer, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<Manufacturer> {
    return await prisma.manufacturer.create({
      data,
    });
  }

  async update(id: number, data: Partial<Omit<Manufacturer, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>>): Promise<Manufacturer> {
    return await prisma.manufacturer.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<Manufacturer> {
    return await prisma.manufacturer.delete({
      where: { id },
    });
  }
}