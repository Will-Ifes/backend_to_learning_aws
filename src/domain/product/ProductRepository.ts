import prisma from '../../infrastructure/prisma/PrismaClient';
import { Product } from '@prisma/client';
import { encrypt, decrypt } from '../../infrastructure/crypto/crypto';

export class ProductRepository {
  async getAll(): Promise<Product[]> {
    const products = await prisma.product.findMany();
    return products.map(product => ({
      ...product,
      name: decrypt(product.name),
      description: decrypt(product.description),
    }));
  }

  async getById(id: number): Promise<Product | null> {
    const product = await prisma.product.findUnique({
      where: { id },
    });
    if (product) {
      product.name = decrypt(product.name);
      product.description = decrypt(product.description);
    }
    return product;
  }

  async create(data: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<Product> {
    const encryptedData = {
      ...data,
      name: encrypt(data.name),
      description: encrypt(data.description),
    };
    return await prisma.product.create({
      data: encryptedData,
    });
  }

  async update(id: number, data: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>>): Promise<Product> {
    const encryptedData = {
      ...data,
      name: data.name ? encrypt(data.name) : undefined,
      description: data.description ? encrypt(data.description) : undefined,
    };
    return await prisma.product.update({
      where: { id },
      data: encryptedData,
    });
  }

  async delete(id: number): Promise<Product> {
    return await prisma.product.delete({
      where: { id },
    });
  }
}