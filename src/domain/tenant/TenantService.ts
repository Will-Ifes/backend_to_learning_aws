import { Tenant } from './Tenant';
import { TenantRepository } from './TenantRepository';

const tenantRepository = new TenantRepository();

export const getAllTenants = async (): Promise<Tenant[]> => {
  return await tenantRepository.getAll();
};

export const getTenant = async (id: number): Promise<Tenant | null> => {
  return await tenantRepository.getById(id);
};

export const createNewTenant = async (data: Tenant): Promise<Tenant> => {
  return await tenantRepository.create(data);
};

export const updateExistingTenant = async (id: number, data: Tenant): Promise<Tenant> => {
  return await tenantRepository.update(id, data);
};

export const deleteExistingTenant = async (id: number): Promise<Tenant> => {
  return await tenantRepository.delete(id);
};