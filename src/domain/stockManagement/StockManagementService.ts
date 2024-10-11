import { StockManagement } from './StockManagement';
import { StockManagementRepository } from './StockManagementRepository';

const stockManagementRepository = new StockManagementRepository();

export const getAllStockManagements = async (): Promise<StockManagement[]> => {
  return await stockManagementRepository.getAll();
};

export const getStockManagement = async (id: number): Promise<StockManagement | null> => {
  return await stockManagementRepository.getById(id);
};

export const createNewStockManagement = async (data: StockManagement): Promise<StockManagement> => {
  return await stockManagementRepository.create(data);
};

export const updateExistingStockManagement = async (id: number, data: StockManagement): Promise<StockManagement> => {
  return await stockManagementRepository.update(id, data);
};

export const deleteExistingStockManagement = async (id: number): Promise<StockManagement> => {
  return await stockManagementRepository.delete(id);
};