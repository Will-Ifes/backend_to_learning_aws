import { PrismaClient, Role, Status, StockManagementType } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Limpar todas as tabelas antes de inserir novos registros
  await prisma.stockManagement.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.supplier.deleteMany({});
  await prisma.tenant.deleteMany({});
  await prisma.sector.deleteMany({});
  await prisma.employeePositions.deleteMany({});
  await prisma.activationCode.deleteMany({});
  await prisma.accessGroup.deleteMany({});

  // Criar Tenants
  const tenants = await prisma.tenant.createMany({
    data: [
      {
        name: 'Tenant 1',
        cnpj: '12345678000101',
        address: 'Address 1',
        phone: '1234567890',
        email: 'tenant1@example.com',
        contact: 'Contact 1',
      },
      {
        name: 'Tenant 2',
        cnpj: '12345678000102',
        address: 'Address 2',
        phone: '1234567891',
        email: 'tenant2@example.com',
        contact: 'Contact 2',
      },
      {
        name: 'Tenant 3',
        cnpj: '12345678000103',
        address: 'Address 3',
        phone: '1234567892',
        email: 'tenant3@example.com',
        contact: 'Contact 3',
      },
    ],
  });

  const tenantIds = await prisma.tenant
    .findMany()
    .then((tenants) => tenants.map((tenant) => tenant.id));

  // Criar Suppliers
  const suppliers = await prisma.supplier.createMany({
    data: [
      {
        name: 'Supplier 1',
        cnpj: '22345678000101',
        address: 'Supplier Address 1',
        phone: '2234567890',
        email: 'supplier1@example.com',
        contact: 'Supplier Contact 1',
      },
      {
        name: 'Supplier 2',
        cnpj: '22345678000102',
        address: 'Supplier Address 2',
        phone: '2234567891',
        email: 'supplier2@example.com',
        contact: 'Supplier Contact 2',
      },
      {
        name: 'Supplier 3',
        cnpj: '22345678000103',
        address: 'Supplier Address 3',
        phone: '2234567892',
        email: 'supplier3@example.com',
        contact: 'Supplier Contact 3',
      },
      {
        name: 'Supplier 4',
        cnpj: '22345678000104',
        address: 'Supplier Address 4',
        phone: '2234567893',
        email: 'supplier4@example.com',
        contact: 'Supplier Contact 4',
      },
      {
        name: 'Supplier 5',
        cnpj: '22345678000105',
        address: 'Supplier Address 5',
        phone: '2234567894',
        email: 'supplier5@example.com',
        contact: 'Supplier Contact 5',
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
      name: `Product ${i}`,
      description: `Description for product ${i}`,
      price: Math.random() * 100,
      supplierId: supplierIds[i % supplierIds.length],
      brand: `Brand ${i}`,
      unit: `Unit ${i}`,
      quantity: Math.floor(Math.random() * 100),
      tenantId: tenantIds[i % tenantIds.length],
    });
  }
  await prisma.product.createMany({ data: products });

  const productIds = await prisma.product
    .findMany()
    .then((products) => products.map((product) => product.id));

  // Criar Setores
  const sectors = await prisma.sector.createMany({
    data: [
      { name: 'Sector 1' },
      { name: 'Sector 2' },
      { name: 'Sector 3' },
    ],
  });

  const sectorIds = await prisma.sector
    .findMany()
    .then((sectors) => sectors.map((sector) => sector.id));

  // Criar Posições de Funcionário
  const positions = await prisma.employeePositions.createMany({
    data: [
      { name: 'Position 1' },
      { name: 'Position 2' },
      { name: 'Position 3' },
    ],
  });

  const positionIds = await prisma.employeePositions
    .findMany()
    .then((positions) => positions.map((position) => position.id));

  // Criar Códigos de Ativação
  const activationCodes = await prisma.activationCode.createMany({
    data: [
      { code: 'ACTIVATION1' },
      { code: 'ACTIVATION2' },
      { code: 'ACTIVATION3' },
    ],
  });

  const activationCodeIds = await prisma.activationCode
    .findMany()
    .then((codes) => codes.map((code) => code.id));

  // Criar Grupos de Acesso
  const accessGroups = await prisma.accessGroup.createMany({
    data: [
      { name: 'Group 1', screens: ['Screen1', 'Screen2'] },
      { name: 'Group 2', screens: ['Screen3', 'Screen4'] },
      { name: 'Group 3', screens: ['Screen5', 'Screen6'] },
    ],
  });

  const accessGroupIds = await prisma.accessGroup
    .findMany()
    .then((groups) => groups.map((group) => group.id));

  // Criar Usuários
  const users = [];
  const hashedPassword = await bcrypt.hash('password', 10);
  for (let i = 1; i <= 50; i++) {
    users.push({
      email: `user${i}@example.com`,
      password: hashedPassword,
      name: `User ${i}`,
      cpf: `0000000000${i}`,
      role: i <= 5 ? Role.ADMIN : Role.USER,
      tenantId: tenantIds[i % tenantIds.length],
      sectorId: sectorIds[i % sectorIds.length],
      employeePositionId: positionIds[i % positionIds.length],
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