import request from 'supertest';
import { PrismaClient } from '@prisma/client';
import { afterAll, afterEach, describe, it, expect, beforeAll } from '@jest/globals';
import http from 'http';
import app from '../src/application/server/App';

const prisma = new PrismaClient();
let server: http.Server;
const TEST_PORT = 3334; // Porta diferente para os testes

let createdTenantIds: number[] = [];

beforeAll((done) => {
  // Iniciar o servidor em uma porta diferente para os testes
  server = app.listen(TEST_PORT, () => {
    console.log(`Test server running on port ${TEST_PORT}`);
    done();
  });
});

afterEach(async () => {
  // Deletar os tenants criados durante os testes
  await prisma.tenant.deleteMany({
    where: {
      id: {
        in: createdTenantIds,
      },
    },
  });
  createdTenantIds = [];
});

afterAll(async () => {
  // Fechar a conexão com o Prisma após os testes
  await prisma.$disconnect();

  // Parar o servidor após os testes
  server.close();
});

describe('Tenant API', () => {
  it('deve criar um novo tenant', async () => {
    const tenantData = {
      name: 'Tenant Test Backend',
      cnpj: '99999999999999',
      email: 'tenantbackend@test.com',
      address: 'Rua Backend, 999',
      contact: '999999999',
    };

    // Verificar se o tenant já existe
    const existingTenant = await prisma.tenant.findFirst({
      where: { cnpj: tenantData.cnpj },
    });

    if (!existingTenant) {
      const response = await request(app)
        .post('/tenants')
        .send(tenantData)
        .set('Host', `localhost:${TEST_PORT}`);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(tenantData.name);

      // Armazenar o ID do tenant criado
      createdTenantIds.push(response.body.id);
    }
  });

  it('deve buscar todos os tenants', async () => {
    const response = await request(app)
      .get('/tenants')
      .set('Host', `localhost:${TEST_PORT}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('deve buscar um tenant por ID', async () => {
    const tenantData = {
      name: 'Tenant Test Backend 2',
      cnpj: '99999999999998',
      email: 'tenantbackend2@test.com',
      address: 'Rua Backend, 998',
      contact: '998999999',
    };

    // Verificar se o tenant já existe
    let tenant = await prisma.tenant.findFirst({
      where: { cnpj: tenantData.cnpj },
    });

    if (!tenant) {
      tenant = await prisma.tenant.create({
        data: tenantData,
      });
      createdTenantIds.push(tenant.id);
    }

    const response = await request(app)
      .get(`/tenants/${tenant.id}`)
      .set('Host', `localhost:${TEST_PORT}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', tenant.id);
  });

  it('deve atualizar um tenant existente', async () => {
    const tenantData = {
      name: 'Tenant Test Backend 3',
      cnpj: '99999999999997',
      email: 'tenantbackend3@test.com',
      address: 'Rua Backend, 997',
      contact: '997999999',
    };

    // Verificar se o tenant já existe
    let tenant = await prisma.tenant.findFirst({
      where: { cnpj: tenantData.cnpj },
    });

    if (!tenant) {
      tenant = await prisma.tenant.create({
        data: tenantData,
      });
      createdTenantIds.push(tenant.id);
    }

    const updatedData = {
      name: 'Tenant Test Backend 3 Updated',
    };

    const response = await request(app)
      .put(`/tenants/${tenant.id}`)
      .send(updatedData)
      .set('Host', `localhost:${TEST_PORT}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name', updatedData.name);
  });

  it('deve deletar um tenant existente', async () => {
    const tenantData = {
      name: 'Tenant Test Backend 4',
      cnpj: '99999999999996',
      email: 'tenantbackend4@test.com',
      address: 'Rua Backend, 996',
      contact: '996999999',
    };

    // Verificar se o tenant já existe
    let tenant = await prisma.tenant.findFirst({
      where: { cnpj: tenantData.cnpj },
    });

    if (!tenant) {
      tenant = await prisma.tenant.create({
        data: tenantData,
      });
      createdTenantIds.push(tenant.id);
    }

    const response = await request(app)
      .delete(`/tenants/${tenant.id}`)
      .set('Host', `localhost:${TEST_PORT}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Tenant deleted successfully');
  });
});