import { PrismaClient, Status, StockManagementType } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { encrypt } from '../src/infrastructure/crypto/crypto';

const prisma = new PrismaClient();

async function main() {
  // Limpar todas as tabelas antes de inserir novos registros
  await prisma.stockManagement.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.supplier.deleteMany({});
  await prisma.tenant.deleteMany({});
  await prisma.sector.deleteMany({});
  await prisma.positions.deleteMany({});
  await prisma.activationCode.deleteMany({});
  await prisma.accessGroup.deleteMany({});
  await prisma.permission.deleteMany({});
  await prisma.address.deleteMany({});
  await prisma.employee.deleteMany({});
  await prisma.manufacturer.deleteMany({});

  // Criar Tenants
  const tenants = await prisma.tenant.createMany({
    data: [
      {
        name: encrypt('Tenant 1'),
        cnpj: encrypt('12345678000101'),
        email: encrypt('tenant1@example.com'),
        address: encrypt('Address 1'),
        contact: encrypt('Contact 1'),
      },
      {
        name: encrypt('Tenant 2'),
        cnpj: encrypt('12345678000102'),
        email: encrypt('tenant2@example.com'),
        address: encrypt('Address 2'),
        contact: encrypt('Contact 2'),
      },
      {
        name: encrypt('Tenant 3'),
        cnpj: encrypt('12345678000103'),
        email: encrypt('tenant3@example.com'),
        address: encrypt('Address 3'),
        contact: encrypt('Contact 3'),
      },
    ],
  });

  const tenantIds = await prisma.tenant
    .findMany()
    .then((tenants) => tenants.map((tenant) => tenant.id));

  // Criar Endereços
  const addresses = await prisma.address.createMany({
    data: [
      { cep: '12345678', street: 'Street 1', neighborhood: 'Neighborhood 1', number: '1', city: 'City 1', state: 'State 1', country: 'Brasil' },
      { cep: '12345679', street: 'Street 2', neighborhood: 'Neighborhood 2', number: '2', city: 'City 2', state: 'State 2', country: 'Brasil' },
      { cep: '12345680', street: 'Street 3', neighborhood: 'Neighborhood 3', number: '3', city: 'City 3', state: 'State 3', country: 'Brasil' },
    ],
  });

  const addressIds = await prisma.address
    .findMany()
    .then((addresses) => addresses.map((address) => address.id));

  // Criar Suppliers
  const suppliers = await prisma.supplier.createMany({
    data: [
      {
        name: encrypt('Supplier 1'),
        cnpj: encrypt('22345678000101'),
        phone: encrypt('2234567890'),
        email: encrypt('supplier1@example.com'),
        contact: encrypt('Supplier Contact 1'),
        addressId: addressIds[0],
        tenantId: tenantIds[0],
      },
      {
        name: encrypt('Supplier 2'),
        cnpj: encrypt('22345678000102'),
        phone: encrypt('2234567891'),
        email: encrypt('supplier2@example.com'),
        contact: encrypt('Supplier Contact 2'),
        addressId: addressIds[1],
        tenantId: tenantIds[1],
      },
      {
        name: encrypt('Supplier 3'),
        cnpj: encrypt('22345678000103'),
        phone: encrypt('2234567892'),
        email: encrypt('supplier3@example.com'),
        contact: encrypt('Supplier Contact 3'),
        addressId: addressIds[2],
        tenantId: tenantIds[2],
      },
      {
        name: encrypt('Supplier 4'),
        cnpj: encrypt('22345678000104'),
        phone: encrypt('2234567893'),
        email: encrypt('supplier4@example.com'),
        contact: encrypt('Supplier Contact 4'),
        addressId: addressIds[0],
        tenantId: tenantIds[0],
      },
      {
        name: encrypt('Supplier 5'),
        cnpj: encrypt('22345678000105'),
        phone: encrypt('2234567894'),
        email: encrypt('supplier5@example.com'),
        contact: encrypt('Supplier Contact 5'),
        addressId: addressIds[1],
        tenantId: tenantIds[1],
      },
    ],
  });

  const supplierIds = await prisma.supplier
    .findMany()
    .then((suppliers) => suppliers.map((supplier) => supplier.id));

  // Criar Produtos
  const products = [];
  for (let i = 1; i <= 50; i++) {
    products.push({
      name: encrypt(`Product ${i}`),
      description: encrypt(`Description for product ${i}`),
      price: Math.random() * 100,
      supplierId: supplierIds[i % supplierIds.length],
      brand: encrypt(`Brand ${i}`),
      unit: encrypt(`Unit ${i}`),
      quantity: Math.floor(Math.random() * 100),
      tenantId: tenantIds[i % tenantIds.length],
      manufacturerId: tenantIds[i % tenantIds.length], // Ajuste conforme necessário
    });
  }
  await prisma.product.createMany({ data: products });

  const productIds = await prisma.product
    .findMany()
    .then((products) => products.map((product) => product.id));

  // Criar Setores
  const sectors = await prisma.sector.createMany({
    data: [
      { name: encrypt('Sector 1'), tenantId: tenantIds[0] },
      { name: encrypt('Sector 2'), tenantId: tenantIds[1] },
      { name: encrypt('Sector 3'), tenantId: tenantIds[2] },
    ],
  });

  const sectorIds = await prisma.sector
    .findMany()
    .then((sectors) => sectors.map((sector) => sector.id));

  // Criar Posições de Funcionário
  const positions = await prisma.positions.createMany({
    data: [
      { name: encrypt('Position 1'), tenantId: tenantIds[0] },
      { name: encrypt('Position 2'), tenantId: tenantIds[1] },
      { name: encrypt('Position 3'), tenantId: tenantIds[2] },
    ],
  });

  const positionIds = await prisma.positions
    .findMany()
    .then((positions) => positions.map((position) => position.id));

  // Criar Códigos de Ativação
  const activationCodes = await prisma.activationCode.createMany({
    data: [
      { code: encrypt('ACTIVATION1'), tenantId: tenantIds[0] },
      { code: encrypt('ACTIVATION2'), tenantId: tenantIds[1] },
      { code: encrypt('ACTIVATION3'), tenantId: tenantIds[2] },
    ],
  });

  const activationCodeIds = await prisma.activationCode
    .findMany()
    .then((codes) => codes.map((code) => code.id));

  // Criar Grupos de Acesso
  const accessGroups = await prisma.accessGroup.createMany({
    data: [
      { name: encrypt('Group 1'), tenantId: tenantIds[0] },
      { name: encrypt('Group 2'), tenantId: tenantIds[1] },
      { name: encrypt('Group 3'), tenantId: tenantIds[2] },
    ],
  });

  const accessGroupIds = await prisma.accessGroup
    .findMany()
    .then((groups) => groups.map((group) => group.id));

  // Criar Permissões
  const permissions = await prisma.permission.createMany({
    data: [
      { name: 'Permission 1', url: '/url1', label: 'Label 1', listChecked: true, createChecked: true, updateChecked: true, deleteChecked: true, hasListOption: true, hasDeleteOption: true, hasCreateOption: true, hasUpdateOption: true, accessGroupId: accessGroupIds[0] },
      { name: 'Permission 2', url: '/url2', label: 'Label 2', listChecked: true, createChecked: true, updateChecked: true, deleteChecked: true, hasListOption: true, hasDeleteOption: true, hasCreateOption: true, hasUpdateOption: true, accessGroupId: accessGroupIds[1] },
      { name: 'Permission 3', url: '/url3', label: 'Label 3', listChecked: true, createChecked: true, updateChecked: true, deleteChecked: true, hasListOption: true, hasDeleteOption: true, hasCreateOption: true, hasUpdateOption: true, accessGroupId: accessGroupIds[2] },
    ],
  });

  // Criar Funcionários
  const employees = await prisma.employee.createMany({
    data: [
      { cpf: encrypt('00000000001'), userId: 1, addressId: addressIds[0], tenantId: tenantIds[0] },
      { cpf: encrypt('00000000002'), userId: 2, addressId: addressIds[1], tenantId: tenantIds[1] },
      { cpf: encrypt('00000000003'), userId: 3, addressId: addressIds[2], tenantId: tenantIds[2] },
    ],
  });

  // Criar Usuários
  const users = [];
  const hashedPassword = await bcrypt.hash('password', 10);
  for (let i = 1; i <= 50; i++) {
    users.push({
      email: encrypt(`user${i}@example.com`),
      password: hashedPassword,
      name: encrypt(`User ${i}`),
      cpf: encrypt(`0000000000${i}`),
      tenantId: tenantIds[i % tenantIds.length],
      sectorId: sectorIds[i % sectorIds.length],
      positionId: positionIds[i % positionIds.length],
      activationCodeId: activationCodeIds[i % activationCodeIds.length],
      status: Status.ACTIVE,
    });
  }
  await prisma.user.createMany({ data: users });

  const userIds = await prisma.user
    .findMany()
    .then((users) => users.map((user) => user.id));

  // Criar Movimentos de Estoque
  const stockManagements = [];
  for (let i = 1; i <= 100; i++) {
    stockManagements.push({
      type: i % 2 === 0 ? StockManagementType.ENTRY : StockManagementType.EXIT,
      date: new Date(),
      quantity: Math.floor(Math.random() * 100),
      value: Math.random() * 100,
      productId: productIds[i % productIds.length],
      userId: userIds[i % userIds.length],
      tenantId: tenantIds[i % tenantIds.length],
    });
  }
  await prisma.stockManagement.createMany({ data: stockManagements });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });