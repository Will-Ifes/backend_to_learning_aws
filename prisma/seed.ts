import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Criar Tenants
  const tenant1 = await prisma.tenant.create({
    data: {
      name: 'Tenant 1',
      cnpj: '12345678000100',
      email: 'tenant1@example.com',
      address: 'Rua A, 123',
      contact: '123456789',
    },
  });

  // Criar Addresses
  const address1 = await prisma.address.create({
    data: {
      cep: '12345678',
      street: 'Rua B',
      neighborhood: 'Bairro B',
      number: '456',
      city: 'Cidade B',
      state: 'Estado B',
      country: 'Brasil',
    },
  });

  const address2 = await prisma.address.create({
    data: {
      cep: '87654321',
      street: 'Rua C',
      neighborhood: 'Bairro C',
      number: '789',
      city: 'Cidade C',
      state: 'Estado C',
      country: 'Brasil',
    },
  });

  // Criar Users
  const user1 = await prisma.user.create({
    data: {
      status: 'ACTIVE',
      email: 'user1@example.com',
      password: 'password1',
      name: 'User 1',
      tenantId: tenant1.id,
    },
  });

  // Criar Employees
  const employee1 = await prisma.employee.create({
    data: {
      cpf: '12345678901',
      skinColor: 'Branca',
      tenantId: tenant1.id,
      userId: user1.id,
      addressId: address1.id,
    },
  });

  // Atualizar User com EmployeeId
  await prisma.user.update({
    where: { id: user1.id },
    data: { employeeId: employee1.id },
  });

  // Criar Suppliers
  const supplier1 = await prisma.supplier.create({
    data: {
      name: 'Supplier 1',
      cnpj: '98765432000100',
      phone: '987654321',
      email: 'supplier1@example.com',
      contact: 'Contact 1',
      tenantId: tenant1.id,
      addressId: address2.id,
    },
  });

  // Criar Manufacturer
  const manufacturer1 = await prisma.manufacturer.create({
    data: {
      name: 'Manufacturer 1',
      tenantId: tenant1.id,
    },
  });

  // Criar Products
  const product1 = await prisma.product.create({
    data: {
      name: 'Product 1',
      description: 'Description 1',
      price: 100.0,
      unit: 'Unit 1',
      quantity: 10,
      tenantId: tenant1.id,
      supplierId: supplier1.id,
      manufacturerId: manufacturer1.id,
    },
  });

  // Criar StockManagement
  const stockManagement1 = await prisma.stockManagement.create({
    data: {
      type: 'ENTRY',
      date: new Date(),
      quantity: 10,
      value: 100.0,
      productId: product1.id,
      userId: user1.id,
      tenantId: tenant1.id,
    },
  });

  // Criar AccessGroups
  const accessGroup1 = await prisma.accessGroup.create({
    data: {
      name: 'Admin',
      tenantId: tenant1.id,
      users: {
        connect: { id: user1.id },
      },
    },
  });

  // Criar Permissions
  const permission1 = await prisma.permission.create({
    data: {
      name: 'Permission 1',
      url: '/permission1',
      label: 'Permission 1',
      listChecked: true,
      createChecked: true,
      updateChecked: true,
      deleteChecked: true,
      hasListOption: true,
      hasDeleteOption: true,
      hasCreateOption: true,
      hasUpdateOption: true,
      accessGroupId: accessGroup1.id,
    },
  });

  // Criar ActivationCodes
  const activationCode1 = await prisma.activationCode.create({
    data: {
      code: 'ACTIVATIONCODE1',
      tenantId: tenant1.id,
    },
  });

  // Criar Sectors
  const sector1 = await prisma.sector.create({
    data: {
      name: 'Sector 1',
      tenantId: tenant1.id,
    },
  });

  // Criar Positions
  const position1 = await prisma.positions.create({
    data: {
      name: 'Position 1',
      tenantId: tenant1.id,
    },
  });

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });