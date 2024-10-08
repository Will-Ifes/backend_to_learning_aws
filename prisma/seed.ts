import { PrismaClient, Role, Status, MovementType } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Limpar a tabela Tenant antes de inserir novos registros
  await prisma.tenant.deleteMany({});

  // Criar Tenants e obter seus IDs
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

  // Limpar a tabela Supplier antes de inserir novos registros
  await prisma.supplier.deleteMany({});

  // Criar Suppliers e obter seus IDs
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

  // Limpar a tabela Product antes de inserir novos registros
  await prisma.product.deleteMany({});

  // Criar Produtos e obter seus IDs
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

  // Limpar a tabela User antes de inserir novos registros
  await prisma.user.deleteMany({});

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
      status: Status.ACTIVE,
    });
  }
  await prisma.user.createMany({ data: users });

  const userIds = await prisma.user
    .findMany()
    .then((users) => users.map((user) => user.id));

  // Limpar a tabela Movement antes de inserir novos registros
  await prisma.movement.deleteMany({});

  // Criar Movements
  const movements = [];
  for (let i = 1; i <= 100; i++) {
    movements.push({
      type: i % 2 === 0 ? MovementType.ENTRY : MovementType.EXIT,
      date: new Date(),
      quantity: Math.floor(Math.random() * 100),
      value: Math.random() * 100,
      productId: productIds[i % productIds.length],
      userId: userIds[i % userIds.length],
      tenantId: tenantIds[i % tenantIds.length],
    });
  }
  await prisma.movement.createMany({ data: movements });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
