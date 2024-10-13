import { Supplier } from './Supplier';
import { SupplierRepository } from './SupplierRepository';

const supplierRepository = new SupplierRepository();

export const getAllSuppliers = async (): Promise<Supplier[]> => {
  return await supplierRepository.getAll();
};

export const getSupplier = async (id: number): Promise<Supplier | null> => {
  return await supplierRepository.getById(id);
};

export const createNewSupplier = async (data: Omit<Supplier, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<Supplier> => {
  return await supplierRepository.create(data);
};

export const updateExistingSupplier = async (id: number, data: Partial<Omit<Supplier, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>>): Promise<Supplier> => {
  return await supplierRepository.update(id, data);
};

export const deleteExistingSupplier = async (id: number): Promise<Supplier> => {
  return await supplierRepository.delete(id);
};