import { Permission } from './Permission';
import { PermissionRepository } from './PermissionRepository';

const permissionRepository = new PermissionRepository();

export const getAllPermissions = async (): Promise<Permission[]> => {
  return await permissionRepository.getAll();
};

export const getPermission = async (id: number): Promise<Permission | null> => {
  return await permissionRepository.getById(id);
};

export const createNewPermission = async (data: Omit<Permission, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<Permission> => {
  return await permissionRepository.create(data);
};

export const updateExistingPermission = async (id: number, data: Partial<Omit<Permission, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>>): Promise<Permission> => {
  return await permissionRepository.update(id, data);
};

export const deleteExistingPermission = async (id: number): Promise<Permission> => {
  return await permissionRepository.delete(id);
};