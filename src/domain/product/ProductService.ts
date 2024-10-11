import { Product } from './Product';
import { ProductRepository } from './ProductRepository';

const productRepository = new ProductRepository();

export const getAllProducts = async (): Promise<Product[]> => {
  return await productRepository.getAll();
};

export const getProduct = async (id: number): Promise<Product | null> => {
  return await productRepository.getById(id);
};

export const createNewProduct = async (data: Product): Promise<Product> => {
  return await productRepository.create(data);
};

export const updateExistingProduct = async (id: number, data: Product): Promise<Product> => {
  return await productRepository.update(id, data);
};

export const deleteExistingProduct = async (id: number): Promise<Product> => {
  return await productRepository.delete(id);
};