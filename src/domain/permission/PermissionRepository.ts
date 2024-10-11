import prisma from '../../infrastructure/prisma/PrismaClient';
import { Permission } from '@prisma/client';
import { encrypt, decrypt } from '../../infrastructure/crypto/crypto';

export class PermissionRepository {
  async getAll(): Promise<Permission[]> {
    const permissions = await prisma.permission.findMany();
    return permissions.map(permission => ({
      ...permission,
      name: decrypt(permission.name),
      url: decrypt(permission.url),
      label: decrypt(permission.label),
    }));
  }

  async getById(id: number): Promise<Permission | null> {
    const permission = await prisma.permission.findUnique({
      where: { id },
    });
    if (permission) {
      permission.name = decrypt(permission.name);
      permission.url = decrypt(permission.url);
      permission.label = decrypt(permission.label);
    }
    return permission;
  }

  async create(data: Omit<Permission, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<Permission> {
    const encryptedData = {
      ...data,
      name: encrypt(data.name),
      url: encrypt(data.url),
      label: encrypt(data.label),
    };
    return await prisma.permission.create({
      data: encryptedData,
    });
  }

  async update(id: number, data: Partial<Omit<Permission, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>>): Promise<Permission> {
    const encryptedData = {
      ...data,
      name: data.name ? encrypt(data.name) : undefined,
      url: data.url ? encrypt(data.url) : undefined,
      label: data.label ? encrypt(data.label) : undefined,
    };
    return await prisma.permission.update({
      where: { id },
      data: encryptedData,
    });
  }

  async delete(id: number): Promise<Permission> {
    return await prisma.permission.delete({
      where: { id },
    });
  }
}