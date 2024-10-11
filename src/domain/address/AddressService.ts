import { Address } from './Address';
import { AddressRepository } from './AddressRepository';

const addressRepository = new AddressRepository();

export const getAllAddresses = async (): Promise<Address[]> => {
  return await addressRepository.getAll();
};

export const getAddress = async (id: number): Promise<Address | null> => {
  return await addressRepository.getById(id);
};

export const createNewAddress = async (data: Address): Promise<Address> => {
  return await addressRepository.create(data);
};

export const updateExistingAddress = async (id: number, data: Address): Promise<Address> => {
  return await addressRepository.update(id, data);
};

export const deleteExistingAddress = async (id: number): Promise<Address> => {
  return await addressRepository.delete(id);
};