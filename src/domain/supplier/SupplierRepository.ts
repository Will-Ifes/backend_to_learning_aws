import prisma from '../../infrastructure/prisma/PrismaClient';
import { Supplier } from '@prisma/client';
import { encrypt, decrypt } from '../../infrastructure/crypto/crypto';

const isEncryptedFormat = (text: string): boolean => {
  return text.includes(':');
};

export class SupplierRepository {
  async getAll(): Promise<Supplier[]> {
    try {
      const suppliers = await prisma.supplier.findMany();
      return suppliers.map(supplier => ({
        ...supplier,
        name: isEncryptedFormat(supplier.name) ? decrypt(supplier.name) : supplier.name,
        cnpj: isEncryptedFormat(supplier.cnpj) ? decrypt(supplier.cnpj) : supplier.cnpj,
        phone: isEncryptedFormat(supplier.phone) ? decrypt(supplier.phone) : supplier.phone,
        email: isEncryptedFormat(supplier.email) ? decrypt(supplier.email) : supplier.email,
        contact: isEncryptedFormat(supplier.contact) ? decrypt(supplier.contact) : supplier.contact,
      }));
    } catch (error) {
      console.error('Error in getAll:', error);
      throw error;
    }
  }

  async getById(id: number): Promise<Supplier | null> {
    try {
      const supplier = await prisma.supplier.findUnique({
        where: { id },
      });
      if (supplier) {
        supplier.name = isEncryptedFormat(supplier.name) ? decrypt(supplier.name) : supplier.name;
        supplier.cnpj = isEncryptedFormat(supplier.cnpj) ? decrypt(supplier.cnpj) : supplier.cnpj;
        supplier.phone = isEncryptedFormat(supplier.phone) ? decrypt(supplier.phone) : supplier.phone;
        supplier.email = isEncryptedFormat(supplier.email) ? decrypt(supplier.email) : supplier.email;
        supplier.contact = isEncryptedFormat(supplier.contact) ? decrypt(supplier.contact) : supplier.contact;
      }
      return supplier;
    } catch (error) {
      console.error('Error in getById:', error);
      throw error;
    }
  }

  async create(data: Omit<Supplier, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<Supplier> {
    try {
      const encryptedData = {
        ...data,
        name: encrypt(data.name),
        cnpj: encrypt(data.cnpj),
        phone: encrypt(data.phone),
        email: encrypt(data.email),
        contact: encrypt(data.contact),
      };
      const createdSupplier = await prisma.supplier.create({
        data: encryptedData,
      });
      return {
        ...createdSupplier,
        name: decrypt(createdSupplier.name),
        cnpj: decrypt(createdSupplier.cnpj),
        phone: decrypt(createdSupplier.phone),
        email: decrypt(createdSupplier.email),
        contact: decrypt(createdSupplier.contact),
      };
    } catch (error) {
      console.error('Error in create:', error);
      throw error;
    }
  }

  async update(id: number, data: Partial<Omit<Supplier, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>>): Promise<Supplier> {
    try {
      const encryptedData = {
        ...data,
        name: data.name ? encrypt(data.name) : undefined,
        cnpj: data.cnpj ? encrypt(data.cnpj) : undefined,
        phone: data.phone ? encrypt(data.phone) : undefined,
        email: data.email ? encrypt(data.email) : undefined,
        contact: data.contact ? encrypt(data.contact) : undefined,
      };
      const updatedSupplier = await prisma.supplier.update({
        where: { id },
        data: encryptedData,
      });
      return {
        ...updatedSupplier,
        name: decrypt(updatedSupplier.name),
        cnpj: decrypt(updatedSupplier.cnpj),
        phone: decrypt(updatedSupplier.phone),
        email: decrypt(updatedSupplier.email),
        contact: decrypt(updatedSupplier.contact),
      };
    } catch (error) {
      console.error('Error in update:', error);
      throw error;
    }
  }

  async delete(id: number): Promise<Supplier> {
    try {
      const deletedSupplier = await prisma.supplier.delete({
        where: { id },
      });
      return {
        ...deletedSupplier,
        name: decrypt(deletedSupplier.name),
        cnpj: decrypt(deletedSupplier.cnpj),
        phone: decrypt(deletedSupplier.phone),
        email: decrypt(deletedSupplier.email),
        contact: decrypt(deletedSupplier.contact),
      };
    } catch (error) {
      console.error('Error in delete:', error);
      throw error;
    }
  }
}