import prisma from '../../infrastructure/prisma/PrismaClient';
import { Tenant } from '@prisma/client';
import { encrypt, decrypt } from '../../infrastructure/crypto/crypto';

const isEncryptedFormat = (text: string): boolean => {
  return text.includes(':');
};

export class TenantRepository {
  async getAll(): Promise<Tenant[]> {
    try {
      const tenants = await prisma.tenant.findMany();
      return tenants.map(tenant => ({
        ...tenant,
        name: isEncryptedFormat(tenant.name) ? decrypt(tenant.name) : tenant.name,
        cnpj: isEncryptedFormat(tenant.cnpj) ? decrypt(tenant.cnpj) : tenant.cnpj,
        email: isEncryptedFormat(tenant.email) ? decrypt(tenant.email) : tenant.email,
        address: tenant.address && isEncryptedFormat(tenant.address) ? decrypt(tenant.address) : tenant.address,
        contact: tenant.contact && isEncryptedFormat(tenant.contact) ? decrypt(tenant.contact) : tenant.contact,
      }));
    } catch (error) {
      console.error('Error in getAll:', error);
      throw error;
    }
  }

  async getById(id: number): Promise<Tenant | null> {
    try {
      const tenant = await prisma.tenant.findUnique({
        where: { id },
      });
      if (tenant) {
        tenant.name = isEncryptedFormat(tenant.name) ? decrypt(tenant.name) : tenant.name;
        tenant.cnpj = isEncryptedFormat(tenant.cnpj) ? decrypt(tenant.cnpj) : tenant.cnpj;
        tenant.email = isEncryptedFormat(tenant.email) ? decrypt(tenant.email) : tenant.email;
        tenant.address = tenant.address && isEncryptedFormat(tenant.address) ? decrypt(tenant.address) : tenant.address;
        tenant.contact = tenant.contact && isEncryptedFormat(tenant.contact) ? decrypt(tenant.contact) : tenant.contact;
      }
      return tenant;
    } catch (error) {
      console.error('Error in getById:', error);
      throw error;
    }
  }

  async create(data: Omit<Tenant, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<Tenant> {
    try {
      const encryptedData = {
        ...data,
        name: encrypt(data.name),
        cnpj: encrypt(data.cnpj),
        email: encrypt(data.email),
        address: data.address ? encrypt(data.address) : null,
        contact: data.contact ? encrypt(data.contact) : null,
      };
      const createdTenant = await prisma.tenant.create({
        data: encryptedData,
      });
      return {
        ...createdTenant,
        name: decrypt(createdTenant.name),
        cnpj: decrypt(createdTenant.cnpj),
        email: decrypt(createdTenant.email),
        address: createdTenant.address ? decrypt(createdTenant.address) : null,
        contact: createdTenant.contact ? decrypt(createdTenant.contact) : null,
      };
    } catch (error) {
      console.error('Error in create:', error);
      throw error;
    }
  }

  async update(id: number, data: Partial<Omit<Tenant, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>>): Promise<Tenant> {
    try {
      const encryptedData = {
        ...data,
        name: data.name ? encrypt(data.name) : undefined,
        cnpj: data.cnpj ? encrypt(data.cnpj) : undefined,
        email: data.email ? encrypt(data.email) : undefined,
        address: data.address ? encrypt(data.address) : null,
        contact: data.contact ? encrypt(data.contact) : null,
      };
      const updatedTenant = await prisma.tenant.update({
        where: { id },
        data: encryptedData,
      });
      return {
        ...updatedTenant,
        name: decrypt(updatedTenant.name),
        cnpj: decrypt(updatedTenant.cnpj),
        email: decrypt(updatedTenant.email),
        address: updatedTenant.address ? decrypt(updatedTenant.address) : null,
        contact: updatedTenant.contact ? decrypt(updatedTenant.contact) : null,
      };
    } catch (error) {
      console.error('Error in update:', error);
      throw error;
    }
  }

  async delete(id: number): Promise<Tenant> {
    try {
      const deletedTenant = await prisma.tenant.delete({
        where: { id },
      });
      return {
        ...deletedTenant,
        name: decrypt(deletedTenant.name),
        cnpj: decrypt(deletedTenant.cnpj),
        email: decrypt(deletedTenant.email),
        address: deletedTenant.address ? decrypt(deletedTenant.address) : null,
        contact: deletedTenant.contact ? decrypt(deletedTenant.contact) : null,
      };
    } catch (error) {
      console.error('Error in delete:', error);
      throw error;
    }
  }
}

export default new TenantRepository();