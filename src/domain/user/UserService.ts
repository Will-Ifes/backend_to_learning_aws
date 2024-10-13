import { User } from './User';
import { UserRepository } from './UserRepository';

const userRepository = new UserRepository();

export const getAllUsers = async (): Promise<User[]> => {
  return await userRepository.getAll();
};

export const getUser = async (id: number): Promise<User | null> => {
  return await userRepository.getById(id);
};

export const createNewUser = async (data: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<User> => {
  // Garantir que employeeId seja number | null
  const userData = {
    ...data,
    employeeId: data.employeeId ?? null,
  };
  return await userRepository.create(userData);
};

export const updateExistingUser = async (id: number, data: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>>): Promise<User> => {
  return await userRepository.update(id, data);
};

export const deleteExistingUser = async (id: number): Promise<User> => {
  return await userRepository.delete(id);
};