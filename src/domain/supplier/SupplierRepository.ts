import prisma from '../../infrastructure/prisma/PrismaClient';
import { Supplier } from '@prisma/client';
import { encrypt, decrypt } from '../../infrastructure/crypto/crypto';

export class SupplierRepository {
  async create(data: Omit<Supplier, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<Supplier> {
    const encryptedData = {
      ...data,
      name: encrypt(data.name),
      cnpj: encrypt(data.cnpj),
      phone: encrypt(data.phone),
      email: encrypt(data.email),
      contact: encrypt(data.contact),
    };
    return await prisma.supplier.create({
      data: encryptedData,
    });
  }

  async getById(id: number): Promise<Supplier | null> {
    const supplier = await prisma.supplier.findUnique({
      where: { id },
    });
    if (supplier) {
      supplier.name = decrypt(supplier.name);
      supplier.cnpj = decrypt(supplier.cnpj);
      supplier.phone = decrypt(supplier.phone);
      supplier.email = decrypt(supplier.email);
      supplier.contact = decrypt(supplier.contact);
    }
    return supplier;
  }

  // Outros métodos do repositório...
}