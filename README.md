# Backend Base Wert

## Visão Geral

Este é o backend do projeto Wert, construído com Node.js, Express, TypeScript e Prisma. Ele fornece uma API RESTful para gerenciar várias entidades, incluindo usuários, empresas, produtos, fornecedores, endereços entre outros.

## Estrutura do Projeto

```plaintext
backend-base-wert/
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.ts
├── src/
│   ├── application/
│   │   ├── server/
│   │   │   ├── App.ts
│   │   │   └── Server.ts
│   │   ├── middlewares/
│   │   │   └── AuthMiddleware.ts
│   │   ├── routes/
│   │   │   ├── AccessGroupRoutes.ts
│   │   │   ├── AddressRoutes.ts
│   │   │   ├── EmployeeRoutes.ts
│   │   │   ├── PermissionRoutes.ts
│   │   │   ├── PositionsRoutes.ts
│   │   │   ├── ProductRoutes.ts
│   │   │   ├── SectorRoutes.ts
│   │   │   ├── StockManagementRoutes.ts
│   │   │   ├── SupplierRoutes.ts
│   │   │   ├── TenantRoutes.ts
│   │   │   └── UserRoutes.ts
│   ├── domain/
│   │   ├── accessGroup/
│   │   │   ├── AccessGroup.ts
│   │   │   ├── AccessGroupService.ts
│   │   │   ├── AccessGroupRepository.ts
│   │   │   └── AccessGroupController.ts
│   │   ├── address/
│   │   │   ├── Address.ts
│   │   │   ├── AddressService.ts
│   │   │   ├── AddressRepository.ts
│   │   │   └── AddressController.ts
│   │   ├── employee/
│   │   │   ├── Employee.ts
│   │   │   ├── EmployeeService.ts
│   │   │   ├── EmployeeRepository.ts
│   │   │   └── EmployeeController.ts
│   │   ├── permission/
│   │   │   ├── Permission.ts
│   │   │   ├── PermissionService.ts
│   │   │   ├── PermissionRepository.ts
│   │   │   └── PermissionController.ts
│   │   ├── positions/
│   │   │   ├── Positions.ts
│   │   │   ├── PositionsService.ts
│   │   │   ├── PositionsRepository.ts
│   │   │   └── PositionsController.ts
│   │   ├── product/
│   │   │   ├── Product.ts
│   │   │   ├── ProductService.ts
│   │   │   ├── ProductRepository.ts
│   │   │   └── ProductController.ts
│   │   ├── sector/
│   │   │   ├── Sector.ts
│   │   │   ├── SectorService.ts
│   │   │   ├── SectorRepository.ts
│   │   │   └── SectorController.ts
│   │   ├── stockManagement/
│   │   │   ├── StockManagement.ts
│   │   │   ├── StockManagementService.ts
│   │   │   ├── StockManagementRepository.ts
│   │   │   └── StockManagementController.ts
│   │   ├── supplier/
│   │   │   ├── Supplier.ts
│   │   │   ├── SupplierService.ts
│   │   │   ├── SupplierRepository.ts
│   │   │   └── SupplierController.ts
│   │   ├── tenant/
│   │   │   ├── Tenant.ts
│   │   │   ├── TenantService.ts
│   │   │   ├── TenantRepository.ts
│   │   │   └── TenantController.ts
│   │   ├── user/
│   │   │   ├── User.ts
│   │   │   ├── UserService.ts
│   │   │   ├── UserRepository.ts
│   │   │   └── UserController.ts
│   ├── infrastructure/
│   │   ├── bcrypt/
│   │   │   └── Bcrypt.ts
│   │   ├── crypto/
│   │   │   └── Crypto.ts
│   │   ├── logger/
│   │   │   ├── Logger.ts
│   │   │   └── LoggerFactory.ts
│   │   └── prisma/
│   │       └── PrismaClient.ts
│   ├── middlewares/
│   │   └── AuthMiddleware.ts
│   ├── models/
│   │   ├── AccessGroup.ts
│   │   ├── Address.ts
│   │   ├── Employee.ts
│   │   ├── Permission.ts
│   │   ├── Positions.ts
│   │   ├── Product.ts
│   │   ├── Sector.ts
│   │   ├── StockManagement.ts
│   │   ├── Supplier.ts
│   │   ├── Tenant.ts
│   │   └── User.ts
│   └── tests/
│       └── auth.test.ts
├── .env
├── .eslintrc.json
├── .gitignore
├── .prettierrc
├── jest.config.js
├── package.json
├── README.md
└── tsconfig.json
```

## Instalação

1. Clone o repositório:
   ```sh
   git clone https://github.com/Will-Ifes/backend-base-wert.git
   cd backend-base-wert
   ```

2. Instale as dependências:
   ```sh
   pnpm install
   ```

3. Configure o arquivo `.env` com as variáveis de ambiente necessárias.

4. Inicialize o Prisma:
   ```sh
   pnpm run prisma:init
   ```

5. Gere o cliente Prisma:
   ```sh
   pnpm run prisma:generate
   ```

6. Execute as migrações do Prisma:
   ```sh
   pnpm run prisma:migrate
   ```

7. Popule o banco de dados com dados iniciais (opcional):
   ```sh
   pnpm run prisma:seed
   ```

## Uso

### Desenvolvimento

Para iniciar o servidor em modo de desenvolvimento:
```sh
pnpm run dev
```

### Produção

Para construir e iniciar o servidor em modo de produção:
```sh
pnpm run build
pnpm start
```

### Testes

Para executar os testes:
```sh
pnpm test
```

### Linting

Para verificar o código com ESLint:
```sh
pnpm run lint
```

### Formatação

Para formatar o código com Prettier:
```sh
pnpm run format
```

## Dependências

- `@prisma/client`
- `bcryptjs`
- `cors`
- `dotenv`
- `express`
- `jsonwebtoken`
- `multer`
- `swagger-jsdoc`
- `swagger-ui-express`
- `zod`

## Dependências de Desenvolvimento

- `@jest/globals`
- `@types/bcryptjs`
- `@types/cors`
- `@types/express`
- `@types/jest`
- `@types/jsonwebtoken`
- `@types/mocha`
- `@types/multer`
- `@types/node`
- `@types/supertest`
- `@types/swagger-jsdoc`
- `@types/swagger-ui-express`
- `@typescript-eslint/eslint-plugin`
- `@typescript-eslint/parser`
- `eslint`
- `eslint-config-prettier`
- `eslint-plugin-prettier`
- `jest`
- `nodemon`
- `prettier`
- `prisma`
- `supertest`
- `ts-jest`
- `ts-node`
- `typescript`

## Autor

Will-Ifes

## Licença

ISC

---

Para visualizar este arquivo Markdown de forma mais amigável, você pode usar a extensão [Markdown Preview Enhanced](https://marketplace.visualstudio.com/items?itemName=shd101wyy.markdown-preview-enhanced) no Visual Studio Code.

