import express, { Request, Response } from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import { authenticateToken } from "./middleware/auth";

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000", // ajuste para o domínio que precisa de acesso
    methods: ["*"], // defina os métodos permitidos
    credentials: true, // se precisar enviar cookies/sessões
  })
);

app.use(express.json());

interface CustomRequest extends Request {}
interface CustomResponse extends Response {}

app.get("/", (req: CustomRequest, res: CustomResponse) => {
  res.send("Success!");
});

app.use("/auth", authRoutes);

// Rotas protegidas
app.use(
  "/protected",
  // @ts-ignore
  authenticateToken,
  (req: CustomRequest, res: CustomResponse) => {
    res.send("This is a protected route");
  }
);

app.listen(process.env.PORT, () => {
  console.log(`Backend running at ${process.env.BACKEND_URL}`);
});
