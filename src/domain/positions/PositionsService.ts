import { Position } from './Positions';
import { PositionsRepository } from './PositionsRepository';

const positionsRepository = new PositionsRepository();

export const getAllPositions = async (): Promise<Position[]> => {
  return await positionsRepository.getAll();
};

export const getPosition = async (id: number): Promise<Position | null> => {
  return await positionsRepository.getById(id);
};

export const createNewPosition = async (data: Position): Promise<Position> => {
  return await positionsRepository.create(data);
};

export const updateExistingPosition = async (id: number, data: Position): Promise<Position> => {
  return await positionsRepository.update(id, data);
};

export const deleteExistingPosition = async (id: number): Promise<Position> => {
  return await positionsRepository.delete(id);
};