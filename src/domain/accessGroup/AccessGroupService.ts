import { AccessGroup } from './AccessGroup';
import { AccessGroupRepository } from './AccessGroupRepository';

const accessGroupRepository = new AccessGroupRepository();

export const getAllAccessGroups = async (): Promise<AccessGroup[]> => {
  return await accessGroupRepository.getAll();
};

export const getAccessGroup = async (id: number): Promise<AccessGroup | null> => {
  return await accessGroupRepository.getById(id);
};

export const createNewAccessGroup = async (data: AccessGroup): Promise<AccessGroup> => {
  return await accessGroupRepository.create(data);
};

export const updateExistingAccessGroup = async (id: number, data: AccessGroup): Promise<AccessGroup> => {
  return await accessGroupRepository.update(id, data);
};

export const deleteExistingAccessGroup = async (id: number): Promise<AccessGroup> => {
  return await accessGroupRepository.delete(id);
};