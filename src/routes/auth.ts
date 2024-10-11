import multer from 'multer';
import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

const router = Router();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret'; // Use uma variável de ambiente para a chave secreta
const upload = multer({ storage: multer.memoryStorage() });

interface RegisterRequestBody {
  email: string;
  cpf: string;
  password: string;
  name: string;
  tenantId: number;
}

interface LoginRequestBody {
  email: string;
  password: string;
}

interface UpdateUserRequestBody {
  email?: string;
  name?: string;
  tenantId?: number;
}

interface CreateTenantRequestBody {
  name: string;
  cnpj: string;
  address: string;
  phone: string;
  email: string;
  contact: string;
}


const registerSchema = z.object({
  email: z.string().email(),
  cpf: z.string().min(11).max(14), // Ajuste conforme necessário
  password: z.string().min(6),
  name: z.string().min(1, 'O nome é obrigatório'), // Nome obrigatório
  tenantId: z.number(),
  sectorId: z.number().min(1, 'O setor é obrigatório'), // Setor obrigatório
  employeePositionId: z.number().min(1, 'A posição do funcionário é obrigatória'), // Posição do funcionário obrigatória
  color: z.string().optional(),
  activationCode: z.string(),
});

const loginSchema = z.object({
  email: z.string().email('Insira um email válido'),
  password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
});

const updateUserSchema = z.object({
  email: z.string().email('Insira um email válido').optional(),
  name: z.string().min(1, 'O nome é obrigatório').optional(),
  tenantId: z
    .number()
    .int()
    .positive('O tenantId deve ser um número positivo')
    .optional(),
});

const createTenantSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  cnpj: z.string().length(14, 'O CNPJ deve ter 14 caracteres'),
  address: z.string().min(1, 'O endereço é obrigatório'),
  phone: z.string().min(1, 'O telefone é obrigatório'),
  email: z.string().email('Insira um email válido'),
  contact: z.string().min(1, 'O contato é obrigatório'),
});

const tenantSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  cnpj: z.string().length(14, 'O CNPJ deve ter 14 caracteres'),
  address: z.string().min(1, 'O endereço é obrigatório'),
  phone: z.string().min(1, 'O telefone é obrigatório'),
  email: z.string().email('Insira um email válido'),
  contact: z.string().min(1, 'O contato é obrigatório'),
});

const supplierSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  cnpj: z.string().length(14, 'O CNPJ deve ter 14 caracteres'),
  address: z.string().min(1, 'O endereço é obrigatório'),
  phone: z.string().min(1, 'O telefone é obrigatório'),
  email: z.string().email('Insira um email válido'),
  contact: z.string().min(1, 'O contato é obrigatório'),
});

const productSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório').optional(),
  description: z.string().min(1, 'A descrição é obrigatória').optional(),
  price: z
    .preprocess(
      (val) => Number(val),
      z.number().positive('O preço deve ser um número positivo'),
    )
    .optional(),
  supplierId: z
    .preprocess(
      (val) => Number(val),
      z.number().int().positive('O supplierId deve ser um número positivo'),
    )
    .optional(),
  brand: z.string().min(1, 'A marca é obrigatória').optional(),
  unit: z.string().min(1, 'A unidade é obrigatória').optional(),
  quantity: z
    .preprocess(
      (val) => Number(val),
      z.number().int().positive('A quantidade deve ser um número positivo'),
    )
    .optional(),
  tenantId: z
    .preprocess(
      (val) => Number(val),
      z.number().int().positive('O tenantId deve ser um número positivo'),
    )
    .optional(),
  image: z.string().optional(),
});

const sectorSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
});

const employeePositionsSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
});

const activationCodeSchema = z.object({
  code: z.string().min(1, 'O código é obrigatório'),
  isActive: z.boolean().optional(),
});

const accessGroupSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  screens: z.array(z.string().min(1, 'O nome da tela é obrigatório')),
});

router.post(
  '/register',
  async (req: Request<{}, {}, RegisterRequestBody>, res: Response | any) => {
    try {
      const parsedData = registerSchema.safeParse(req.body);

      if (!parsedData.success) {
        console.error('Dados inválidos:', parsedData.error);
        return res.status(400).json({
          message: 'Dados inválidos',
          errors: parsedData.error.errors,
        });
      }

      const { email, cpf, password, name, tenantId, sectorId, employeePositionId, color, activationCode } = parsedData.data;

      // Verificar se o tenantId existe
      const tenant = await prisma.tenant.findUnique({
        where: { id: tenantId },
      });
      if (!tenant) {
        return res.status(400).json({ error: 'Invalid tenantId' });
      }

      // Verificar se o código de ativação é válido e ativo
      const activationCodeRecord = await prisma.activationCode.findUnique({
        where: { code: activationCode },
      });
      if (!activationCodeRecord || !activationCodeRecord.isActive) {
        return res.status(400).json({ error: 'Invalid or inactive activation code' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          email,
          cpf, // Certifique-se de que o CPF está sendo passado corretamente
          password: hashedPassword,
          name,
          tenantId,
          sectorId,
          employeePositionId, // Posição do funcionário obrigatória
          color,
          activationCodeId: activationCodeRecord.id,
        },
      });

      // Desativar o código de ativação após o uso
      await prisma.activationCode.update({
        where: { id: activationCodeRecord.id },
        data: { isActive: false },
      });

      res.json(user);
    } catch (error: any) {
      console.error('Erro ao registrar usuário:', error);
      res
        .status(500)
        .json({ error: 'Erro ao registrar usuário', details: error.message });
    }
  },
);

async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Credenciais inválidas');
  }

  const token = jwt.sign(
    {
      userId: user.id,
      tenantId: user.tenantId,
      role: user.role,
      name: user.name,
      email: user.email,
    },
    JWT_SECRET, // Use a variável de ambiente para a chave secreta
    { expiresIn: '1d' },
  );

  return {
    token,
    user: {
      userId: user.id,
      name: user.name,
      tenantId: user.tenantId,
      email: user.email,
    },
  };
}

router.post(
  '/login',
  async (req: Request<{}, {}, LoginRequestBody>, res: Response | any) => {
    const { email, password } = req.body;

    try {
      const parsedCredentials = loginSchema.safeParse({ email, password });

      if (!parsedCredentials.success) {
        console.error('Credenciais inválidas:', parsedCredentials.error);
        return res.status(400).json({ message: 'Credenciais inválidas' });
      }

      const { token, user } = await loginUser(email, password);
      res.json({ message: 'Login bem-sucedido', token, user });
    } catch (error) {
      console.error('Erro ao fazer login:', (error as Error).message);
      if ((error as Error).message === 'Usuário não encontrado') {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      } else if ((error as Error).message === 'Credenciais inválidas') {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      } else {
        return res.status(500).json({ message: 'Erro ao fazer login' });
      }
    }
  },
);

// Adicionando a rota GET para listar todos os usuários
router.get('/users', async (req: Request, res: Response) => {
  //testada e funcionando
  const users = await prisma.user.findMany();
  res.json(users);
});

router.get('/users/pagination', async (req: Request, res: Response) => {
  const {
    page = 1,
    limit = 10,
    sort = 'id',
    order = 'asc',
    fields,
    ...filters
  } = req.query;

  // Convertendo page e limit para números
  const pageNumber = parseInt(page as string, 10);
  const limitNumber = parseInt(limit as string, 10);

  // Construindo o objeto de ordenação
  const orderBy = { [sort as string]: order as 'asc' | 'desc' };

  // Construindo o objeto de seleção de campos
  const select = fields
    ? (fields as string).split(',').reduce(
        (acc, field) => {
          acc[field] = true;
          return acc;
        },
        {} as Record<string, boolean>,
      )
    : undefined;

  try {
    // Buscando os usuários com filtros, paginação, ordenação e seleção de campos
    const users = await prisma.user.findMany({
      where: filters,
      skip: (pageNumber - 1) * limitNumber,
      take: limitNumber,
      orderBy,
      select,
    });

    // Contando o total de usuários para paginação
    const totalUsers = await prisma.user.count({ where: filters });

    res.json({
      data: users,
      meta: {
        total: totalUsers,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(totalUsers / limitNumber),
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

// Adicionando a rota GET para buscar um usuário pelo email
router.get('/user/:email', async (req: Request, res: Response | any) => {
  //testada e funcionando
  const { email } = req.params;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.json(user);
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
});

// Adicionando a rota PATCH para atualizar um usuário
router.patch(
  // testada e funcionando
  '/user/:id',
  async (
    req: Request<
      { id: string },
      {},
      UpdateUserRequestBody & { password?: string }
    >,
    res: Response | any,
  ) => {
    const parsedData = updateUserSchema
      .extend({
        password: z
          .string()
          .min(8, 'A senha deve ter no mínimo 8 caracteres')
          .optional(),
        cpf: z.string().length(11, 'O CPF deve ter 11 caracteres').optional(),
        dateOfBirth: z.string().optional(),
        dailyExposureHours: z.number().optional(),
        status: z.string().optional(),
      })
      .safeParse(req.body);

    if (!parsedData.success) {
      console.error('Dados inválidos:', parsedData.error);
      return res.status(400).json({
        message: 'Dados inválidos',
        errors: parsedData.error.errors,
      });
    }

    const { id } = req.params;
    const {
      email,
      name,
      tenantId,
      password,
      cpf,
      dateOfBirth,
      dailyExposureHours,
      status,
    } = parsedData.data;

    try {
      const updateData: any = {
        email,
        name,
        tenantId,
        cpf,
        dateOfBirth,
        dailyExposureHours,
        status,
      };

      if (password) {
        updateData.password = await bcrypt.hash(password, 10);
      }

      const user = await prisma.user.update({
        where: { id: Number(id) },
        data: updateData,
      });
      res.json(user);
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
  },
);

// Adicionando a rota DELETE para deletar um usuário
router.delete(
  '/user/:id',
  async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    try {
      await prisma.user.delete({
        where: { id: Number(id) },
      });
      res.json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
  },
);

// Adicionando a rota GET para listar todos os tenants
router.get('/tenants', async (req: Request, res: Response) => {
  //testada e funcionando
  const tenants = await prisma.tenant.findMany();
  res.json(tenants);
});

// Adicionando a rota POST para criar um tenant
router.post(
  // testada e funcionando
  '/tenant',
  async (
    req: Request<{}, {}, CreateTenantRequestBody>,
    res: Response | any,
  ) => {
    const parsedData = createTenantSchema.safeParse(req.body);

    if (!parsedData.success) {
      console.error('Dados inválidos:', parsedData.error);
      return res.status(400).json({
        message: 'Dados inválidos',
        errors: parsedData.error.errors,
      });
    }

    const { name, cnpj, address, phone, email, contact } = parsedData.data;

    try {
      const tenant = await prisma.tenant.create({
        data: {
          name,
          cnpj,
          address,
          phone,
          email,
          contact,
        },
      });
      res.json(tenant);
    } catch (error) {
      console.error('Erro ao criar tenant:', error);
      res.status(500).json({ error: 'Erro ao criar tenant' });
    }
  },
);

// Adicionando a rota PATCH para atualizar um tenant
router.patch(
  // testada e funcionando
  '/tenant/:id',
  async (req: Request<{ id: string }>, res: Response | any) => {
    const parsedData = tenantSchema.safeParse(req.body);
    if (!parsedData.success) {
      return res
        .status(400)
        .json({ message: 'Dados inválidos', errors: parsedData.error.errors });
    }
    const tenant = await prisma.tenant.update({
      where: { id: Number(req.params.id) },
      data: parsedData.data,
    });
    res.json(tenant);
  },
);

// Adicionando a rota DELETE para deletar um tenant
router.delete(
  '/tenant/:id',
  async (req: Request<{ id: string }>, res: Response) => {
    await prisma.tenant.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: 'Tenant deletado com sucesso' });
  },
);

// Adicionando a rota GETT para listar todos suppliers
router.get('/suppliers', async (req: Request, res: Response) => {
  // testada e funcionando
  const suppliers = await prisma.supplier.findMany();
  res.json(suppliers);
});

// Adicionando a rota POST para criar um supplier
router.post('/supplier', async (req: Request, res: Response | any) => {
  // testada e funcionando
  const parsedData = supplierSchema.safeParse(req.body);
  if (!parsedData.success) {
    return res
      .status(400)
      .json({ message: 'Dados inválidos', errors: parsedData.error.errors });
  }
  const supplier = await prisma.supplier.create({ data: parsedData.data });
  res.json(supplier);
});

// Adicionando a rota PATCH para atualizar um supplier
router.patch(
  // testada e funcionando
  '/supplier/:id',
  async (req: Request<{ id: string }>, res: Response | any) => {
    const parsedData = supplierSchema.safeParse(req.body);
    if (!parsedData.success) {
      return res
        .status(400)
        .json({ message: 'Dados inválidos', errors: parsedData.error.errors });
    }
    const supplier = await prisma.supplier.update({
      where: { id: Number(req.params.id) },
      data: parsedData.data,
    });
    res.json(supplier);
  },
);

// Adicionando a rota DELETE para deletar um supplier
router.delete(
  // testada e funcionando
  '/supplier/:id',
  async (req: Request<{ id: string }>, res: Response) => {
    await prisma.supplier.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: 'Supplier deletado com sucesso' });
  },
);

// Adicionando a rota GET para listar os products
router.get('/products', async (req: Request, res: Response) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

// Adicionando a rota POST para criar um product
router.post(
  '/product',
  upload.single('image'),
  async (req: Request, res: Response | any) => {
    const parsedData = productSchema.safeParse(req.body);
    if (!parsedData.success) {
      return res
        .status(400)
        .json({ message: 'Dados inválidos', errors: parsedData.error.errors });
    }

    const { tenantId, ...productData } = parsedData.data;
    const image = req.file ? req.file.buffer : undefined;

    const createData: any = {
      ...productData,
      tenantId,
      ...(image && { image }),
    };

    try {
      const product = await prisma.product.create({
        data: createData,
      });
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar o produto', error });
    }
  },
);

// Adicionando a rota PATCH para atualizar os product
router.patch(
  '/product/:id',
  upload.single('image'),
  async (req: Request<{ id: string }>, res: Response | any) => {
    const parsedData = productSchema.safeParse(req.body);
    if (!parsedData.success) {
      return res
        .status(400)
        .json({ message: 'Dados inválidos', errors: parsedData.error });
    }

    const { tenantId, ...productData } = parsedData.data;
    const image = req.file ? req.file.buffer : undefined;

    const updateData: any = {
      ...productData,
      ...(tenantId && { tenantId }),
      ...(image && { image: { set: image } }),
    };

    try {
      const product = await prisma.product.update({
        where: { id: Number(req.params.id) },
        data: updateData,
      });
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar o produto', error });
    }
  },
);

// Adicionando a rota DELETE para atualizar um product
router.delete(
  '/product/:id',
  async (req: Request<{ id: string }>, res: Response) => {
    await prisma.product.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: 'Product deletado com sucesso' });
  },
);

// Adicionando a rota GET para listar todos os setores
router.get('/sectors', async (req: Request, res: Response) => {
  const sectors = await prisma.sector.findMany();
  res.json(sectors);
});
// Adicionando a rota POST para criar um setor
router.post('/sector', async (req: Request, res: Response | any) => {
  const parsedData = sectorSchema.safeParse(req.body);
  if (!parsedData.success) {
    return res
      .status(400)
      .json({ message: 'Dados inválidos', errors: parsedData.error.errors });
  }
  const sector = await prisma.sector.create({ data: parsedData.data });
  res.json(sector);
});

// Adicionando a rota DELETE para deletar um setor
router.delete('/sector/:id', async (req: Request<{ id: string }>, res: Response) => {
  await prisma.sector.delete({ where: { id: Number(req.params.id) } });
  res.json({ message: 'Setor deletado com sucesso' });
});

// Adicionando a rota GET para listar todos os cargos
router.get('/employeePositionss', async (req: Request, res: Response) => {
  const employeePositionss = await prisma.employeePositions.findMany();
  res.json(employeePositionss);
});

// Adicionando a rota POST para criar um cargo
router.post('/employeePositions', async (req: Request, res: Response | any) => {
  const parsedData = employeePositionsSchema.safeParse(req.body);
  if (!parsedData.success) {
    return res
      .status(400)
      .json({ message: 'Dados inválidos', errors: parsedData.error.errors });
  }
  const employeePositions = await prisma.employeePositions.create({ data: parsedData.data });
  res.json(employeePositions);
});

// Adicionando a rota DELETE para deletar um cargo
router.delete('/employeePositions/:id', async (req: Request<{ id: string }>, res: Response) => {
  await prisma.employeePositions.delete({ where: { id: Number(req.params.id) } });
  res.json({ message: 'Cargo deletado com sucesso' });
});

// Adicionando a rota GET para listar todos os códigos de ativação
router.get('/activation-codes', async (req: Request, res: Response) => {
  const activationCodes = await prisma.activationCode.findMany();
  res.json(activationCodes);
});

// Adicionando a rota POST para criar um código de ativação
router.post('/activation-code', async (req: Request, res: Response | any) => {
  const parsedData = activationCodeSchema.safeParse(req.body);
  if (!parsedData.success) {
    return res
      .status(400)
      .json({ message: 'Dados inválidos', errors: parsedData.error.errors });
  }
  const activationCode = await prisma.activationCode.create({ data: parsedData.data });
  res.json(activationCode);
});

// Adicionando a rota DELETE para deletar um código de ativação
router.delete('/activation-code/:id', async (req: Request<{ id: string }>, res: Response) => {
  await prisma.activationCode.delete({ where: { id: Number(req.params.id) } });
  res.json({ message: 'Código de ativação deletado com sucesso' });
});

// Adicionando a rota GET para listar todos os grupos de acesso
router.get('/access-groups', async (req: Request, res: Response) => {
  const accessGroups = await prisma.accessGroup.findMany();
  res.json(accessGroups);
});

// Adicionando a rota POST para criar um grupo de acesso
router.post('/access-group', async (req: Request, res: Response | any) => {
  const parsedData = accessGroupSchema.safeParse(req.body);
  if (!parsedData.success) {
    return res
      .status(400)
      .json({ message: 'Dados inválidos', errors: parsedData.error.errors });
  }
  const accessGroup = await prisma.accessGroup.create({ data: parsedData.data });
  res.json(accessGroup);
});

// Adicionando a rota DELETE para deletar um grupo de acesso
router.delete('/access-group/:id', async (req: Request<{ id: string }>, res: Response) => {
  await prisma.accessGroup.delete({ where: { id: Number(req.params.id) } });
  res.json({ message: 'Grupo de acesso deletado com sucesso' });
});

export default router;
