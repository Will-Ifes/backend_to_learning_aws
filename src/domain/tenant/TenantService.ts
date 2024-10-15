import { Tenant } from './Tenant';
import { TenantRepository } from './TenantRepository';

const tenantRepository = new TenantRepository();

export const getAllTenants = async (): Promise<Tenant[]> => {
  return await tenantRepository.getAll();
};

export const getTenant = async (id: number): Promise<Tenant | null> => {
  return await tenantRepository.getById(id);
};

export const createNewTenant = async (data: Omit<Tenant, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<Tenant> => {
  // Garantir que address e contact sejam string | null
  const tenantData = {
    ...data,
    address: data.address ?? null,
    contact: data.contact ?? null,
  };
  return await tenantRepository.create(tenantData);
};

export const updateExistingTenant = async (id: number, data: Partial<Omit<Tenant, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>>): Promise<Tenant> => {
  return await tenantRepository.update(id, data);
};

export const deleteExistingTenant = async (id: number): Promise<Tenant> => {
  return await tenantRepository.delete(id);
};