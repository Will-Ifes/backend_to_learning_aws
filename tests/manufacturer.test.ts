import request from 'supertest';
import app from '../src/application/server/App';
import { PrismaClient } from '@prisma/client';
import { beforeAll, afterAll, describe, it, expect } from '@jest/globals';

const prisma = new PrismaClient();

let createdManufacturerIds: number[] = [];
let tenantId: number;

beforeAll(async () => {
  // Criar um tenant para associar aos manufacturers
  const tenant = await prisma.tenant.create({
    data: {
      name: 'Tenant for Manufacturer',
      cnpj: '99999999999995',
      email: 'tenantformanufacturer@test.com',
      address: 'Rua Backend, 995',
      contact: '995999999',
    },
  });
  tenantId = tenant.id;
});

afterAll(async () => {
  // Deletar os manufacturers criados durante os testes
  await prisma.manufacturer.deleteMany({
    where: {
      id: {
        in: createdManufacturerIds,
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

describe('Manufacturer API', () => {
  it('deve criar um novo manufacturer', async () => {
    const manufacturerData = {
      name: 'Manufacturer Test Backend',
      tenantId: tenantId,
    };

    const response = await request(app)
      .post('/manufacturers')
      .send(manufacturerData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(manufacturerData.name);

    // Armazenar o ID do manufacturer criado
    createdManufacturerIds.push(response.body.id);
  });

  it('deve buscar todos os manufacturers', async () => {
    const response = await request(app).get('/manufacturers');

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('deve buscar um manufacturer por ID', async () => {
    const manufacturerData = {
      name: 'Manufacturer Test Backend 2',
      tenantId: tenantId,
    };

    const manufacturer = await prisma.manufacturer.create({
      data: manufacturerData,
    });
    createdManufacturerIds.push(manufacturer.id);

    const response = await request(app).get(`/manufacturers/${manufacturer.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', manufacturer.id);
  });

  it('deve atualizar um manufacturer existente', async () => {
    const manufacturerData = {
      name: 'Manufacturer Test Backend 3',
      tenantId: tenantId,
    };

    const manufacturer = await prisma.manufacturer.create({
      data: manufacturerData,
    });
    createdManufacturerIds.push(manufacturer.id);

    const updatedData = {
      name: 'Manufacturer Test Backend 3 Updated',
    };

    const response = await request(app)
      .put(`/manufacturers/${manufacturer.id}`)
      .send(updatedData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name', updatedData.name);
  });

  it('deve deletar um manufacturer existente', async () => {
    const manufacturerData = {
      name: 'Manufacturer Test Backend 4',
      tenantId: tenantId,
    };

    const manufacturer = await prisma.manufacturer.create({
      data: manufacturerData,
    });
    createdManufacturerIds.push(manufacturer.id);

    const response = await request(app).delete(`/manufacturers/${manufacturer.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Manufacturer deleted successfully');
  });
});