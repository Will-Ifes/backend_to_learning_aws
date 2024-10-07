import request from "supertest";
import express from "express";
import router from "../src/routes/auth";
import { PrismaClient } from "@prisma/client";
import { beforeAll, afterAll, describe, it, expect } from "@jest/globals";

const app = express();
app.use(express.json());
app.use("/", router);

// Middleware de tratamento de erros
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
  }
);

const prisma = new PrismaClient();

describe("Auth Routes", () => {
  let tenantId: number;
  let userId: number; // Variável para armazenar o ID do usuário

  beforeAll(async () => {
    // Deletar todos os registros existentes que possam interferir nos testes
    await prisma.user.deleteMany({});
    await prisma.tenant.deleteMany({});

    // Criar tenant para os testes
    const tenant = await prisma.tenant.create({
      data: {
        name: "Test Tenant 008550",
        cnpj: "10045888500999",
        address: "Test Address 085555",
        phone: "1234999890",
        email: "tenant00099teste@testeexample.com",
        contact: "Test Contact 004017",
      },
    });
    tenantId = tenant.id;

    // Criar usuário para os testes
    const user = await prisma.user.create({
      data: {
        email: "testuserteste@testeexample.com",
        cpf: "55545699901",
        password: "password123",
        name: "Test User Exemple",
        tenantId, // usa o tenantId criado
      },
    });
    userId = user.id; // Armazena o ID do usuário
  });

  afterAll(async () => {
    // Deletar apenas os registros criados durante os testes
    await prisma.user.deleteMany({ where: { id: userId } });
    await prisma.tenant.deleteMany({ where: { id: tenantId } });
    await prisma.$disconnect();
  });

  it("should register a new user", async () => {
    const response = await request(app).post("/register").send({
      email: "testetesteteste@testeexample.com",
      cpf: "27999699988",
      password: "password123",
      name: "New User generated 0000",
      tenantId, // usa o tenantId criado
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body.email).toBe("testetesteteste@testeexample.com");
  });

  it("should return an error for invalid tenantId", async () => {
    const response = await request(app).post("/register").send({
      email: "invalidteteffcnant@testeexample.com",
      cpf: "12344448992",
      password: "password123",
      name: "Invalid Tenant User Password",
      tenantId: 999, // Um tenantId que não existe
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error", "Invalid tenantId");
  });

  it("should return an error for invalid data", async () => {
    const response = await request(app).post("/register").send({
      email: "invalidemail", // Este email é inválido
      cpf: "12345678901", // CPF deve ter 11 dígitos, mas aqui estamos usando um exemplo
      password: "short", // Senha curta, deve ter pelo menos 6 caracteres
      name: "", // Nome vazio
      tenantId,
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Dados inválidos");
    expect(response.body.errors).toBeDefined(); // Verifica se existem erros detalhados
  });
});
