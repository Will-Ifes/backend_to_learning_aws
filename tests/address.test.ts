import request from 'supertest';
import app from '../src/application/server/App';
import { PrismaClient } from '@prisma/client';
import { afterAll, describe, it, expect } from '@jest/globals';

const prisma = new PrismaClient();

afterAll(async () => {
  // Fechar a conexão com o Prisma após os testes
  await prisma.$disconnect();
});

describe('Address API', () => {
  it('deve criar um novo address', async () => {
    const addressData = {
      cep: '99999999',
      street: 'Rua Backend',
      neighborhood: 'Backend Neighborhood',
      number: '993',
      city: 'Backend City',
      state: 'Backend State',
      country: 'Brasil',
    };

    const response = await request(app)
      .post('/addresses')
      .send(addressData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.cep).toBe(addressData.cep);

    // Deletar o address criado
    await prisma.address.delete({ where: { id: response.body.id } });
  });

  it('deve buscar todos os addresses', async () => {
    const response = await request(app).get('/addresses');

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('deve buscar um address por ID', async () => {
    const addressData = {
      cep: '88888888',
      street: 'Rua Frontend',
      neighborhood: 'Frontend Neighborhood',
      number: '888',
      city: 'Frontend City',
      state: 'Frontend State',
      country: 'Brasil',
    };

    const address = await prisma.address.create({
      data: addressData,
    });

    const response = await request(app).get(`/addresses/${address.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', address.id);

    // Deletar o address criado
    await prisma.address.delete({ where: { id: address.id } });
  });

  it('deve atualizar um address existente', async () => {
    const addressData = {
      cep: '77777777',
      street: 'Rua Middleware',
      neighborhood: 'Middleware Neighborhood',
      number: '777',
      city: 'Middleware City',
      state: 'Middleware State',
      country: 'Brasil',
    };

    const address = await prisma.address.create({
      data: addressData,
    });

    const updatedData = {
      street: 'Rua Middleware Updated',
    };

    const response = await request(app)
      .put(`/addresses/${address.id}`)
      .send(updatedData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('street', updatedData.street);

    // Deletar o address criado
    await prisma.address.delete({ where: { id: address.id } });
  });

  it('deve deletar um address existente', async () => {
    const addressData = {
      cep: '66666666',
      street: 'Rua Backend',
      neighborhood: 'Backend Neighborhood',
      number: '666',
      city: 'Backend City',
      state: 'Backend State',
      country: 'Brasil',
    };

    const address = await prisma.address.create({
      data: addressData,
    });

    const response = await request(app).delete(`/addresses/${address.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Address deleted successfully');
  });
});