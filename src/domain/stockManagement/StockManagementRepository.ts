import prisma from '../../infrastructure/prisma/PrismaClient';
import { StockManagement } from '@prisma/client';

export class StockManagementRepository {
  async getAll(): Promise<StockManagement[]> {
    return await prisma.stockManagement.findMany();
  }

  async getById(id: number): Promise<StockManagement | null> {
    return await prisma.stockManagement.findUnique({
      where: { id },
    });
  }

  async create(data: Omit<StockManagement, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<StockManagement> {
    return await prisma.stockManagement.create({
      data,
    });
  }

  async update(id: number, data: Partial<Omit<StockManagement, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>>): Promise<StockManagement> {
    return await prisma.stockManagement.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<StockManagement> {
    return await prisma.stockManagement.delete({
      where: { id },
    });
  }
}