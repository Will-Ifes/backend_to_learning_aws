import { User } from './User';
import { UserRepository } from './UserRepository';

const userRepository = new UserRepository();

export const getAllUsers = async (): Promise<User[]> => {
  return await userRepository.getAll();
};

export const getUser = async (id: number): Promise<User | null> => {
  return await userRepository.getById(id);
};

export const createNewUser = async (data: User): Promise<User> => {
  return await userRepository.create(data);
};

export const updateExistingUser = async (id: number, data: User): Promise<User> => {
  return await userRepository.update(id, data);
};

export const deleteExistingUser = async (id: number): Promise<User> => {
  return await userRepository.delete(id);
};