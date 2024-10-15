import { Manufacturer } from './Manufacturer';
import { ManufacturerRepository } from './ManufacturerRepository';

const manufacturerRepository = new ManufacturerRepository();

export const getAllManufacturers = async (): Promise<Manufacturer[]> => {
  return await manufacturerRepository.getAll();
};

export const getManufacturer = async (id: number): Promise<Manufacturer | null> => {
  return await manufacturerRepository.getById(id);
};

export const createNewManufacturer = async (data: Omit<Manufacturer, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<Manufacturer> => {
  return await manufacturerRepository.create(data);
};

export const updateExistingManufacturer = async (id: number, data: Partial<Omit<Manufacturer, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>>): Promise<Manufacturer> => {
  return await manufacturerRepository.update(id, data);
};

export const deleteExistingManufacturer = async (id: number): Promise<Manufacturer> => {
  return await manufacturerRepository.delete(id);
};