import prisma from '../../infrastructure/prisma/PrismaClient';
import { Address } from '@prisma/client';
import { encrypt, decrypt } from '../../infrastructure/crypto/crypto';

export class AddressRepository {
  async getAll(): Promise<Address[]> {
    const addresses = await prisma.address.findMany();
    return addresses.map(address => ({
      ...address,
      cep: decrypt(address.cep),
      street: decrypt(address.street),
      neighborhood: decrypt(address.neighborhood),
      number: decrypt(address.number),
      city: decrypt(address.city),
      state: decrypt(address.state),
      country: decrypt(address.country),
    }));
  }

  async getById(id: number): Promise<Address | null> {
    const address = await prisma.address.findUnique({
      where: { id },
    });
    if (address) {
      address.cep = decrypt(address.cep);
      address.street = decrypt(address.street);
      address.neighborhood = decrypt(address.neighborhood);
      address.number = decrypt(address.number);
      address.city = decrypt(address.city);
      address.state = decrypt(address.state);
      address.country = decrypt(address.country);
    }
    return address;
  }

  async create(data: Omit<Address, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<Address> {
    const encryptedData = {
      ...data,
      cep: encrypt(data.cep),
      street: encrypt(data.street),
      neighborhood: encrypt(data.neighborhood),
      number: encrypt(data.number),
      city: encrypt(data.city),
      state: encrypt(data.state),
      country: encrypt(data.country),
    };
    return await prisma.address.create({
      data: encryptedData,
    });
  }

  async update(id: number, data: Partial<Omit<Address, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>>): Promise<Address> {
    const encryptedData = {
      ...data,
      cep: data.cep ? encrypt(data.cep) : undefined,
      street: data.street ? encrypt(data.street) : undefined,
      neighborhood: data.neighborhood ? encrypt(data.neighborhood) : undefined,
      number: data.number ? encrypt(data.number) : undefined,
      city: data.city ? encrypt(data.city) : undefined,
      state: data.state ? encrypt(data.state) : undefined,
      country: data.country ? encrypt(data.country) : undefined,
    };
    return await prisma.address.update({
      where: { id },
      data: encryptedData,
    });
  }

  async delete(id: number): Promise<Address> {
    return await prisma.address.delete({
      where: { id },
    });
  }
}