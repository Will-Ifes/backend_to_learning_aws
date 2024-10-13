import { Positions } from './Positions';
import { PositionsRepository } from './PositionsRepository';

const positionsRepository = new PositionsRepository();

export const getAllPositions = async (): Promise<Positions[]> => {
  return await positionsRepository.getAll();
};

export const getPosition = async (id: number): Promise<Positions | null> => {
  return await positionsRepository.getById(id);
};

export const createNewPosition = async (data: Omit<Positions, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<Positions> => {
  return await positionsRepository.create(data);
};

export const updateExistingPosition = async (id: number, data: Partial<Omit<Positions, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>>): Promise<Positions> => {
  return await positionsRepository.update(id, data);
};

export const deleteExistingPosition = async (id: number): Promise<Positions> => {
  return await positionsRepository.delete(id);
};