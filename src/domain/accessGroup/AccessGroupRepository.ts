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
    const createdAccessGroup = await prisma.accessGroup.create({
      data: encryptedData,
    });
    return {
      ...createdAccessGroup,
      name: decrypt(createdAccessGroup.name),
    };
  }

  async update(id: number, data: Partial<Omit<AccessGroup, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>>): Promise<AccessGroup> {
    const encryptedData = {
      ...data,
      name: data.name ? encrypt(data.name) : undefined,
    };
    const updatedAccessGroup = await prisma.accessGroup.update({
      where: { id },
      data: encryptedData,
    });
    return {
      ...updatedAccessGroup,
      name: decrypt(updatedAccessGroup.name),
    };
  }

  async delete(id: number): Promise<AccessGroup> {
    const deletedAccessGroup = await prisma.accessGroup.delete({
      where: { id },
    });
    return {
      ...deletedAccessGroup,
      name: decrypt(deletedAccessGroup.name),
    };
  }
}