import prisma from '../../infrastructure/prisma/PrismaClient';
import { Manufacturer } from '@prisma/client';
import { encrypt, decrypt } from '../../infrastructure/crypto/crypto';

export class ManufacturerRepository {
  async getAll(): Promise<Manufacturer[]> {
    const manufacturers = await prisma.manufacturer.findMany();
    return manufacturers.map(manufacturer => ({
      ...manufacturer,
      name: decrypt(manufacturer.name),
    }));
  }

  async getById(id: number): Promise<Manufacturer | null> {
    const manufacturer = await prisma.manufacturer.findUnique({
      where: { id },
    });
    if (manufacturer) {
      manufacturer.name = decrypt(manufacturer.name);
    }
    return manufacturer;
  }

  async create(data: Omit<Manufacturer, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<Manufacturer> {
    const encryptedData = {
      ...data,
      name: encrypt(data.name),
    };
    return await prisma.manufacturer.create({
      data: encryptedData,
    });
  }

  async update(id: number, data: Partial<Omit<Manufacturer, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>>): Promise<Manufacturer> {
    const encryptedData = {
      ...data,
      name: data.name ? encrypt(data.name) : undefined,
    };
    return await prisma.manufacturer.update({
      where: { id },
      data: encryptedData,
    });
  }

  async delete(id: number): Promise<Manufacturer> {
    return await prisma.manufacturer.delete({
      where: { id },
    });
  }
}