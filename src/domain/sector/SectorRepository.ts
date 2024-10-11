import prisma from '../../infrastructure/prisma/PrismaClient';
import { Sector } from '@prisma/client';
import { encrypt, decrypt } from '../../infrastructure/crypto/crypto';

export class SectorRepository {
  async getAll(): Promise<Sector[]> {
    const sectors = await prisma.sector.findMany();
    return sectors.map(sector => ({
      ...sector,
      name: decrypt(sector.name),
    }));
  }

  async getById(id: number): Promise<Sector | null> {
    const sector = await prisma.sector.findUnique({
      where: { id },
    });
    if (sector) {
      sector.name = decrypt(sector.name);
    }
    return sector;
  }

  async create(data: Omit<Sector, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<Sector> {
    const encryptedData = {
      ...data,
      name: encrypt(data.name),
    };
    return await prisma.sector.create({
      data: encryptedData,
    });
  }

  async update(id: number, data: Partial<Omit<Sector, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>>): Promise<Sector> {
    const encryptedData = {
      ...data,
      name: data.name ? encrypt(data.name) : undefined,
    };
    return await prisma.sector.update({
      where: { id },
      data: encryptedData,
    });
  }

  async delete(id: number): Promise<Sector> {
    return await prisma.sector.delete({
      where: { id },
    });
  }
}