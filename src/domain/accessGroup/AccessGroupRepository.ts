import prisma from '../../infrastructure/prisma/PrismaClient';
import { AccessGroup } from '@prisma/client';
import { encrypt, decrypt } from '../../infrastructure/crypto/crypto';

export class AccessGroupRepository {
  async getAll(): Promise<AccessGroup[]> {
    const accessGroups = await prisma.accessGroup.findMany();
    return accessGroups.map(accessGroup => ({
      ...accessGroup,
      name: decrypt(accessGroup.name),
    }));
  }

  async getById(id: number): Promise<AccessGroup | null> {
    const accessGroup = await prisma.accessGroup.findUnique({
      where: { id },
    });
    if (accessGroup) {
      accessGroup.name = decrypt(accessGroup.name);
    }
    return accessGroup;
  }

  async create(data: Omit<AccessGroup, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<AccessGroup> {
    const encryptedData = {
      ...data,
      name: encrypt(data.name),
    };
    return await prisma.accessGroup.create({
      data: encryptedData,
    });
  }

  async update(id: number, data: Partial<Omit<AccessGroup, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>>): Promise<AccessGroup> {
    const encryptedData = {
      ...data,
      name: data.name ? encrypt(data.name) : undefined,
    };
    return await prisma.accessGroup.update({
      where: { id },
      data: encryptedData,
    });
  }

  async delete(id: number): Promise<AccessGroup> {
    return await prisma.accessGroup.delete({
      where: { id },
    });
  }
}