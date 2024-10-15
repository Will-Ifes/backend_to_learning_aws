import prisma from '../../infrastructure/prisma/PrismaClient';
import { Permission } from '@prisma/client';
import { encrypt, decrypt } from '../../infrastructure/crypto/crypto';

const isEncryptedFormat = (text: string): boolean => {
  return text.includes(':');
};

export class PermissionRepository {
  async getAll(): Promise<Permission[]> {
    try {
      const permissions = await prisma.permission.findMany();
      return permissions.map(permission => ({
        ...permission,
        name: isEncryptedFormat(permission.name) ? decrypt(permission.name) : permission.name,
        url: isEncryptedFormat(permission.url) ? decrypt(permission.url) : permission.url,
        label: isEncryptedFormat(permission.label) ? decrypt(permission.label) : permission.label,
      }));
    } catch (error) {
      console.error('Error in getAll:', error);
      throw error;
    }
  }

  async getById(id: number): Promise<Permission | null> {
    try {
      const permission = await prisma.permission.findUnique({
        where: { id },
      });
      if (permission) {
        permission.name = isEncryptedFormat(permission.name) ? decrypt(permission.name) : permission.name;
        permission.url = isEncryptedFormat(permission.url) ? decrypt(permission.url) : permission.url;
        permission.label = isEncryptedFormat(permission.label) ? decrypt(permission.label) : permission.label;
      }
      return permission;
    } catch (error) {
      console.error('Error in getById:', error);
      throw error;
    }
  }

  async create(data: Omit<Permission, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<Permission> {
    try {
      const encryptedData = {
        ...data,
        name: encrypt(data.name),
        url: encrypt(data.url),
        label: encrypt(data.label),
      };
      const createdPermission = await prisma.permission.create({
        data: encryptedData,
      });
      return {
        ...createdPermission,
        name: decrypt(createdPermission.name),
        url: decrypt(createdPermission.url),
        label: decrypt(createdPermission.label),
      };
    } catch (error) {
      console.error('Error in create:', error);
      throw error;
    }
  }

  async update(id: number, data: Partial<Omit<Permission, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>>): Promise<Permission> {
    try {
      const encryptedData = {
        ...data,
        name: data.name ? encrypt(data.name) : undefined,
        url: data.url ? encrypt(data.url) : undefined,
        label: data.label ? encrypt(data.label) : undefined,
      };
      const updatedPermission = await prisma.permission.update({
        where: { id },
        data: encryptedData,
      });
      return {
        ...updatedPermission,
        name: decrypt(updatedPermission.name),
        url: decrypt(updatedPermission.url),
        label: decrypt(updatedPermission.label),
      };
    } catch (error) {
      console.error('Error in update:', error);
      throw error;
    }
  }

  async delete(id: number): Promise<Permission> {
    try {
      const deletedPermission = await prisma.permission.delete({
        where: { id },
      });
      return {
        ...deletedPermission,
        name: decrypt(deletedPermission.name),
        url: decrypt(deletedPermission.url),
        label: decrypt(deletedPermission.label),
      };
    } catch (error) {
      console.error('Error in delete:', error);
      throw error;
    }
  }
}