import request from 'supertest';
import app from '../src/application/server/App';
import { PrismaClient } from '@prisma/client';
import { beforeAll, afterAll, describe, it, expect } from '@jest/globals';

const prisma = new PrismaClient();

let createdUserIds: number[] = [];
let tenantId: number;

beforeAll(async () => {
  // Criar um tenant para associar aos users
  const tenant = await prisma.tenant.create({
    data: {
      name: 'Tenant for User',
      cnpj: '99999999999994',
      email: 'tenantforuser@test.com',
      address: 'Rua Backend, 994',
      contact: '994999999',
    },
  });
  tenantId = tenant.id;
});

afterAll(async () => {
  // Deletar os users criados durante os testes
  await prisma.user.deleteMany({
    where: {
      id: {
        in: createdUserIds,
      },
    },
  });

  // Deletar o tenant criado para os testes
  await prisma.tenant.delete({
    where: { id: tenantId },
  });

  // Fechar a conexão com o Prisma após os testes
  await prisma.$disconnect();
});

describe('User API', () => {


  
  it('deve criar um novo user', async () => {
    const userData = {
      email: 'userbackend@test.com',
      password: 'password123',
      name: 'User Test Backend',
      tenantId: tenantId,
    };

    const response = await request(app)
      .post('/users')
      .send(userData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.email).toBe(userData.email);

    // Armazenar o ID do user criado
    createdUserIds.push(response.body.id);
  });

  it('deve buscar todos os users', async () => {
    const response = await request(app).get('/users');

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('deve buscar um user por ID', async () => {
    const userData = {
      email: 'userbackend2@test.com',
      password: 'password123',
      name: 'User Test Backend 2',
      tenantId: tenantId,
    };

    const user = await prisma.user.create({
      data: userData,
    });
    createdUserIds.push(user.id);

    const response = await request(app).get(`/users/${user.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', user.id);
  });

  it('deve atualizar um user existente', async () => {
    const userData = {
      email: 'userbackend3@test.com',
      password: 'password123',
      name: 'User Test Backend 3',
      tenantId: tenantId,
    };

    const user = await prisma.user.create({
      data: userData,
    });
    createdUserIds.push(user.id);

    const updatedData = {
      name: 'User Test Backend 3 Updated',
    };

    const response = await request(app)
      .put(`/users/${user.id}`)
      .send(updatedData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name', updatedData.name);
  });

  it('deve deletar um user existente', async () => {
    const userData = {
      email: 'userbackend4@test.com',
      password: 'password123',
      name: 'User Test Backend 4',
      tenantId: tenantId,
    };

    const user = await prisma.user.create({
      data: userData,
    });
    createdUserIds.push(user.id);

    const response = await request(app).delete(`/users/${user.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'User deleted successfully');
  });
});