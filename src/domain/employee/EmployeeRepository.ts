import prisma from '../../infrastructure/prisma/PrismaClient';
import { Employee } from '@prisma/client';
import { encrypt, decrypt } from '../../infrastructure/crypto/crypto';

export class EmployeeRepository {
  async getAll(): Promise<Employee[]> {
    const employees = await prisma.employee.findMany();
    return employees.map(employee => ({
      ...employee,
      cpf: decrypt(employee.cpf),
      skinColor: employee.skinColor ? decrypt(employee.skinColor) : null,
    }));
  }

  async getById(id: number): Promise<Employee | null> {
    const employee = await prisma.employee.findUnique({
      where: { id },
    });
    if (employee) {
      employee.cpf = decrypt(employee.cpf);
      employee.skinColor = employee.skinColor ? decrypt(employee.skinColor) : null;
    }
    return employee;
  }

  async create(data: Omit<Employee, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<Employee> {
    const encryptedData = {
      ...data,
      cpf: encrypt(data.cpf),
      skinColor: data.skinColor ? encrypt(data.skinColor) : null,
    };
    return await prisma.employee.create({
      data: encryptedData,
    });
  }

  async update(id: number, data: Partial<Omit<Employee, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>>): Promise<Employee> {
    const encryptedData = {
      ...data,
      cpf: data.cpf ? encrypt(data.cpf) : undefined,
      skinColor: data.skinColor ? encrypt(data.skinColor) : undefined,
    };
    return await prisma.employee.update({
      where: { id },
      data: encryptedData,
    });
  }

  async delete(id: number): Promise<Employee> {
    return await prisma.employee.delete({
      where: { id },
    });
  }
}