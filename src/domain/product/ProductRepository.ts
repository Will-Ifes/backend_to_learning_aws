import prisma from '../../infrastructure/prisma/PrismaClient';
import { Product } from '@prisma/client';

export class ProductRepository {
  async getAll(): Promise<Product[]> {
    return await prisma.product.findMany();
  }

  async getById(id: number): Promise<Product | null> {
    return await prisma.product.findUnique({
      where: { id },
    });
  }

  async create(data: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<Product> {
    return await prisma.product.create({
      data,
    });
  }

  async update(id: number, data: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>>): Promise<Product> {
    return await prisma.product.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<Product> {
    return await prisma.product.delete({
      where: { id },
    });
  }
}