import prisma from '../../infrastructure/prisma/PrismaClient';
import { Address } from '@prisma/client';
import { encrypt, decrypt } from '../../infrastructure/crypto/crypto';

const isEncryptedFormat = (text: string): boolean => {
  return text.includes(':');
};

export class AddressRepository {
  async getAll(): Promise<Address[]> {
    try {
      const addresses = await prisma.address.findMany();
      return addresses.map(address => ({
        ...address,
        street: isEncryptedFormat(address.street) ? decrypt(address.street) : address.street,
        neighborhood: isEncryptedFormat(address.neighborhood) ? decrypt(address.neighborhood) : address.neighborhood,
        number: isEncryptedFormat(address.number) ? decrypt(address.number) : address.number,
        city: isEncryptedFormat(address.city) ? decrypt(address.city) : address.city,
        state: isEncryptedFormat(address.state) ? decrypt(address.state) : address.state,
        country: isEncryptedFormat(address.country) ? decrypt(address.country) : address.country,
      }));
    } catch (error) {
      console.error('Error in getAll:', error);
      throw error;
    }
  }

  async getById(id: number): Promise<Address | null> {
    try {
      const address = await prisma.address.findUnique({
        where: { id },
      });
      if (address) {
        address.street = isEncryptedFormat(address.street) ? decrypt(address.street) : address.street;
        address.neighborhood = isEncryptedFormat(address.neighborhood) ? decrypt(address.neighborhood) : address.neighborhood;
        address.number = isEncryptedFormat(address.number) ? decrypt(address.number) : address.number;
        address.city = isEncryptedFormat(address.city) ? decrypt(address.city) : address.city;
        address.state = isEncryptedFormat(address.state) ? decrypt(address.state) : address.state;
        address.country = isEncryptedFormat(address.country) ? decrypt(address.country) : address.country;
      }
      return address;
    } catch (error) {
      console.error('Error in getById:', error);
      throw error;
    }
  }

  async create(data: Omit<Address, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<Address> {
    try {
      const encryptedData = {
        ...data,
        street: encrypt(data.street),
        neighborhood: encrypt(data.neighborhood),
        number: encrypt(data.number),
        city: encrypt(data.city),
        state: encrypt(data.state),
        country: encrypt(data.country),
      };
      const createdAddress = await prisma.address.create({
        data: encryptedData,
      });
      return {
        ...createdAddress,
        street: decrypt(createdAddress.street),
        neighborhood: decrypt(createdAddress.neighborhood),
        number: decrypt(createdAddress.number),
        city: decrypt(createdAddress.city),
        state: decrypt(createdAddress.state),
        country: decrypt(createdAddress.country),
      };
    } catch (error) {
      console.error('Error in create:', error);
      throw error;
    }
  }

  async update(id: number, data: Partial<Omit<Address, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>>): Promise<Address> {
    try {
      const encryptedData = {
        ...data,
        street: data.street ? encrypt(data.street) : undefined,
        neighborhood: data.neighborhood ? encrypt(data.neighborhood) : undefined,
        number: data.number ? encrypt(data.number) : undefined,
        city: data.city ? encrypt(data.city) : undefined,
        state: data.state ? encrypt(data.state) : undefined,
        country: data.country ? encrypt(data.country) : undefined,
      };
      const updatedAddress = await prisma.address.update({
        where: { id },
        data: encryptedData,
      });
      return {
        ...updatedAddress,
        street: decrypt(updatedAddress.street),
        neighborhood: decrypt(updatedAddress.neighborhood),
        number: decrypt(updatedAddress.number),
        city: decrypt(updatedAddress.city),
        state: decrypt(updatedAddress.state),
        country: decrypt(updatedAddress.country),
      };
    } catch (error) {
      console.error('Error in update:', error);
      throw error;
    }
  }

  async delete(id: number): Promise<Address> {
    try {
      const deletedAddress = await prisma.address.delete({
        where: { id },
      });
      return {
        ...deletedAddress,
        street: decrypt(deletedAddress.street),
        neighborhood: decrypt(deletedAddress.neighborhood),
        number: decrypt(deletedAddress.number),
        city: decrypt(deletedAddress.city),
        state: decrypt(deletedAddress.state),
        country: decrypt(deletedAddress.country),
      };
    } catch (error) {
      console.error('Error in delete:', error);
      throw error;
    }
  }
}