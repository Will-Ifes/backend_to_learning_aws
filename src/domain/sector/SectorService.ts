import { Sector } from './Sector';
import { SectorRepository } from './SectorRepository';

const sectorRepository = new SectorRepository();

export const getAllSectors = async (): Promise<Sector[]> => {
  return await sectorRepository.getAll();
};

export const getSector = async (id: number): Promise<Sector | null> => {
  return await sectorRepository.getById(id);
};

export const createNewSector = async (data: Sector): Promise<Sector> => {
  return await sectorRepository.create(data);
};

export const updateExistingSector = async (id: number, data: Sector): Promise<Sector> => {
  return await sectorRepository.update(id, data);
};

export const deleteExistingSector = async (id: number): Promise<Sector> => {
  return await sectorRepository.delete(id);
};