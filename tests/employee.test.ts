import request from 'supertest';
import app from '../src/application/server/App';
import { PrismaClient } from '@prisma/client';
import { beforeAll, afterAll, describe, it, expect } from '@jest/globals';

const prisma = new PrismaClient();

afterAll(async () => {
  // Fechar a conexão com o Prisma após os testes
  await prisma.$disconnect();
});

describe('Employee API', () => {
  it('deve criar um novo employee', async () => {
    // Criar um tenant para associar ao employee
    const tenant = await prisma.tenant.create({
      data: {
        name: 'Tenant for Employee',
        cnpj: '99999999999993',
        email: 'tenantforemployee@test.com',
        address: 'Rua Backend, 993',
        contact: '993999999',
      },
    });

    // Criar um user para associar ao employee
    const user = await prisma.user.create({
      data: {
        email: `userforemployee${Date.now()}@test.com`,
        password: 'password123',
        name: 'User for Employee',
        tenantId: tenant.id,
      },
    });

    // Criar um address para associar ao employee
    const address = await prisma.address.create({
      data: {
        street: 'Rua Backend',
        number: '993',
        city: 'Backend City',
        state: 'Backend State',
        cep: '99999993',
        neighborhood: 'Backend Neighborhood',
      },
    });

    const employeeData = {
      cpf: '99999999999',
      skinColor: 'Branca',
      tenantId: tenant.id,
      userId: user.id,
      addressId: address.id,
    };

    const response = await request(app)
      .post('/employees')
      .send(employeeData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.cpf).toBe(employeeData.cpf);

    // Deletar os dados criados
    await prisma.employee.delete({ where: { id: response.body.id } });
    await prisma.user.delete({ where: { id: user.id } });
    await prisma.address.delete({ where: { id: address.id } });
    await prisma.tenant.delete({ where: { id: tenant.id } });
  });

  it('deve buscar todos os employees', async () => {
    const response = await request(app).get('/employees');

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('deve buscar um employee por ID', async () => {
    // Criar um tenant para associar ao employee
    const tenant = await prisma.tenant.create({
      data: {
        name: 'Tenant for Employee',
        cnpj: '99999999999993',
        email: 'tenantforemployee@test.com',
        address: 'Rua Backend, 993',
        contact: '993999999',
      },
    });

    // Criar um user para associar ao employee
    const user = await prisma.user.create({
      data: {
        email: `userforemployee${Date.now()}@test.com`,
        password: 'password123',
        name: 'User for Employee',
        tenantId: tenant.id,
      },
    });

    // Criar um address para associar ao employee
    const address = await prisma.address.create({
      data: {
        street: 'Rua Backend',
        number: '993',
        city: 'Backend City',
        state: 'Backend State',
        cep: '99999993',
        neighborhood: 'Backend Neighborhood',
      },
    });

    const employeeData = {
      cpf: '99999999998',
      skinColor: 'Parda',
      tenantId: tenant.id,
      userId: user.id,
      addressId: address.id,
    };

    const employee = await prisma.employee.create({
      data: employeeData,
    });

    const response = await request(app).get(`/employees/${employee.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', employee.id);

    // Deletar os dados criados
    await prisma.employee.delete({ where: { id: employee.id } });
    await prisma.user.delete({ where: { id: user.id } });
    await prisma.address.delete({ where: { id: address.id } });
    await prisma.tenant.delete({ where: { id: tenant.id } });
  });

  it('deve atualizar um employee existente', async () => {
    // Criar um tenant para associar ao employee
    const tenant = await prisma.tenant.create({
      data: {
        name: 'Tenant for Employee',
        cnpj: '99999999999993',
        email: 'tenantforemployee@test.com',
        address: 'Rua Backend, 993',
        contact: '993999999',
      },
    });

    // Criar um user para associar ao employee
    const user = await prisma.user.create({
      data: {
        email: `userforemployee${Date.now()}@test.com`,
        password: 'password123',
        name: 'User for Employee',
        tenantId: tenant.id,
      },
    });

    // Criar um address para associar ao employee
    const address = await prisma.address.create({
      data: {
        street: 'Rua Backend',
        number: '993',
        city: 'Backend City',
        state: 'Backend State',
        cep: '99999993',
        neighborhood: 'Backend Neighborhood',
      },
    });

    const employeeData = {
      cpf: '99999999997',
      skinColor: 'Negra',
      tenantId: tenant.id,
      userId: user.id,
      addressId: address.id,
    };

    const employee = await prisma.employee.create({
      data: employeeData,
    });

    const updatedData = {
      skinColor: 'Amarela',
    };

    const response = await request(app)
      .put(`/employees/${employee.id}`)
      .send(updatedData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('skinColor', updatedData.skinColor);

    // Deletar os dados criados
    await prisma.employee.delete({ where: { id: employee.id } });
    await prisma.user.delete({ where: { id: user.id } });
    await prisma.address.delete({ where: { id: address.id } });
    await prisma.tenant.delete({ where: { id: tenant.id } });
  });

  it('deve deletar um employee existente', async () => {
    // Criar um tenant para associar ao employee
    const tenant = await prisma.tenant.create({
      data: {
        name: 'Tenant for Employee',
        cnpj: '99999999999993',
        email: 'tenantforemployee@test.com',
        address: 'Rua Backend, 993',
        contact: '993999999',
      },
    });

    // Criar um user para associar ao employee
    const user = await prisma.user.create({
      data: {
        email: `userforemployee${Date.now()}@test.com`,
        password: 'password123',
        name: 'User for Employee',
        tenantId: tenant.id,
      },
    });

    // Criar um address para associar ao employee
    const address = await prisma.address.create({
      data: {
        street: 'Rua Backend',
        number: '993',
        city: 'Backend City',
        state: 'Backend State',
        cep: '99999993',
        neighborhood: 'Backend Neighborhood',
      },
    });

    const employeeData = {
      cpf: '99999999996',
      skinColor: 'Indígena',
      tenantId: tenant.id,
      userId: user.id,
      addressId: address.id,
    };

    const employee = await prisma.employee.create({
      data: employeeData,
    });

    const response = await request(app).delete(`/employees/${employee.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Employee deleted successfully');

    // Deletar os dados criados
    await prisma.user.delete({ where: { id: user.id } });
    await prisma.address.delete({ where: { id: address.id } });
    await prisma.tenant.delete({ where: { id: tenant.id } });
  });
});