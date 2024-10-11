import prisma from '../../infrastructure/prisma/PrismaClient';
import { Tenant } from '@prisma/client';
import { encrypt, decrypt } from '../../infrastructure/crypto/crypto';

export class TenantRepository {
  async getAll(): Promise<Tenant[]> {
    const tenants = await prisma.tenant.findMany();
    return tenants.map(tenant => ({
      ...tenant,
      name: decrypt(tenant.name),
      cnpj: decrypt(tenant.cnpj),
      email: decrypt(tenant.email),
      address: tenant.address ? decrypt(tenant.address) : null,
      contact: tenant.contact ? decrypt(tenant.contact) : null,
    }));
  }

  async getById(id: number): Promise<Tenant | null> {
    const tenant = await prisma.tenant.findUnique({
      where: { id },
    });
    if (tenant) {
      tenant.name = decrypt(tenant.name);
      tenant.cnpj = decrypt(tenant.cnpj);
      tenant.email = decrypt(tenant.email);
      tenant.address = tenant.address ? decrypt(tenant.address) : null;
      tenant.contact = tenant.contact ? decrypt(tenant.contact) : null;
    }
    return tenant;
  }

  async create(data: Omit<Tenant, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<Tenant> {
    const encryptedData = {
      ...data,
      name: encrypt(data.name),
      cnpj: encrypt(data.cnpj),
      email: encrypt(data.email),
      address: data.address ? encrypt(data.address) : null,
      contact: data.contact ? encrypt(data.contact) : null,
    };
    return await prisma.tenant.create({
      data: encryptedData,
    });
  }

  async update(id: number, data: Partial<Omit<Tenant, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>>): Promise<Tenant> {
    const encryptedData = {
      ...data,
      name: data.name ? encrypt(data.name) : undefined,
      cnpj: data.cnpj ? encrypt(data.cnpj) : undefined,
      email: data.email ? encrypt(data.email) : undefined,
      address: data.address ? encrypt(data.address) : undefined,
      contact: data.contact ? encrypt(data.contact) : undefined,
    };
    return await prisma.tenant.update({
      where: { id },
      data: encryptedData,
    });
  }

  async delete(id: number): Promise<Tenant> {
    return await prisma.tenant.delete({
      where: { id },
    });
  }
}