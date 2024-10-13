import { ActivationCode } from './ActivationCode';
import { ActivationCodeRepository } from './ActivationCodeRepository';

const activationCodeRepository = new ActivationCodeRepository();

export const getAllActivationCodes = async (): Promise<ActivationCode[]> => {
  return await activationCodeRepository.getAll();
};

export const getActivationCode = async (id: number): Promise<ActivationCode | null> => {
  return await activationCodeRepository.getById(id);
};

export const createNewActivationCode = async (data: Omit<ActivationCode, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<ActivationCode> => {
  return await activationCodeRepository.create(data);
};

export const updateExistingActivationCode = async (id: number, data: Partial<Omit<ActivationCode, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>>): Promise<ActivationCode> => {
  return await activationCodeRepository.update(id, data);
};

export const deleteExistingActivationCode = async (id: number): Promise<ActivationCode> => {
  return await activationCodeRepository.delete(id);
};