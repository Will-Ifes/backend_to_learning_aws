import prisma from '../../infrastructure/prisma/PrismaClient';
import { Employee } from '@prisma/client';
import { encrypt, decrypt } from '../../infrastructure/crypto/crypto';

const isEncryptedFormat = (text: string): boolean => {
  return text.includes(':');
};

export class EmployeeRepository {
  async getAll(): Promise<Employee[]> {
    try {
      const employees = await prisma.employee.findMany();
      return employees.map(employee => ({
        ...employee,
        cpf: isEncryptedFormat(employee.cpf) ? decrypt(employee.cpf) : employee.cpf,
        skinColor: employee.skinColor && isEncryptedFormat(employee.skinColor) ? decrypt(employee.skinColor) : employee.skinColor,
      }));
    } catch (error) {
      console.error('Error in getAll:', error);
      throw error;
    }
  }

  async getById(id: number): Promise<Employee | null> {
    try {
      const employee = await prisma.employee.findUnique({
        where: { id },
      });
      if (employee) {
        employee.cpf = isEncryptedFormat(employee.cpf) ? decrypt(employee.cpf) : employee.cpf;
        employee.skinColor = employee.skinColor && isEncryptedFormat(employee.skinColor) ? decrypt(employee.skinColor) : employee.skinColor;
      }
      return employee;
    } catch (error) {
      console.error('Error in getById:', error);
      throw error;
    }
  }

  async create(data: Omit<Employee, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<Employee> {
    try {
      const encryptedData = {
        ...data,
        cpf: encrypt(data.cpf),
        skinColor: data.skinColor ? encrypt(data.skinColor) : null,
      };
      const createdEmployee = await prisma.employee.create({
        data: encryptedData,
      });
      return {
        ...createdEmployee,
        cpf: decrypt(createdEmployee.cpf),
        skinColor: createdEmployee.skinColor ? decrypt(createdEmployee.skinColor) : null,
      };
    } catch (error) {
      console.error('Error in create:', error);
      throw error;
    }
  }

  async update(id: number, data: Partial<Omit<Employee, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>>): Promise<Employee> {
    try {
      const encryptedData = {
        ...data,
        cpf: data.cpf ? encrypt(data.cpf) : undefined,
        skinColor: data.skinColor ? encrypt(data.skinColor) : null,
      };
      const updatedEmployee = await prisma.employee.update({
        where: { id },
        data: encryptedData,
      });
      return {
        ...updatedEmployee,
        cpf: decrypt(updatedEmployee.cpf),
        skinColor: updatedEmployee.skinColor ? decrypt(updatedEmployee.skinColor) : null,
      };
    } catch (error) {
      console.error('Error in update:', error);
      throw error;
    }
  }

  async delete(id: number): Promise<Employee> {
    try {
      const deletedEmployee = await prisma.employee.delete({
        where: { id },
      });
      return {
        ...deletedEmployee,
        cpf: decrypt(deletedEmployee.cpf),
        skinColor: deletedEmployee.skinColor ? decrypt(deletedEmployee.skinColor) : null,
      };
    } catch (error) {
      console.error('Error in delete:', error);
      throw error;
    }
  }
}