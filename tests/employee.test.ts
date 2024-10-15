import { beforeAll, afterAll, afterEach, describe, it, expect } from '@jest/globals';
import prisma from '../src/infrastructure/prisma/PrismaClient';
import { encrypt } from '../src/infrastructure/crypto/crypto';

let tenantId: number;
let createdEmployeeIds: number[] = [];
let createdUserIds: number[] = [];

beforeAll(async () => {
  // Criar um tenant para associar aos employees
  const tenant = await prisma.tenant.create({
    data: {
      name: encrypt('Tenant for Employee'),
      cnpj: encrypt('99999999999993'),
      email: encrypt('tenantforemployee@test.com'),
      address: encrypt('Rua Backend, 993'),
      contact: encrypt('993999999'),
    },
  });
  tenantId = tenant.id;
});

afterEach(async () => {
  // Deletar os employees criados durante os testes
  await prisma.employee.deleteMany({
    where: {
      id: {
        in: createdEmployeeIds,
      },
    },
  });
  createdEmployeeIds = [];

  // Deletar os users criados durante os testes
  await prisma.user.deleteMany({
    where: {
      id: {
        in: createdUserIds,
      },
    },
  });
  createdUserIds = [];
});

afterAll(async () => {
  // Deletar o tenant criado para os testes
  await prisma.tenant.delete({
    where: {
      id: tenantId,
    },
  });
});

describe('Employee Tests', () => {
  it('should create an employee', async () => {
    // Adicione aqui os testes para criar um employee
  });

  // Adicione mais testes conforme necessário
});