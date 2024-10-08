import express, { Request, Response } from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import { authenticateToken } from './middleware/auth';
import swaggerApp from './swagger';

const app = express();
require('dotenv').config();

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(';') ?? '';

app.use(swaggerApp);

// Permitir todas as origens temporariamente
app.use(cors());

app.use(express.json());

interface CustomRequest extends Request {}
interface CustomResponse extends Response {}

app.get('/', (req: CustomRequest, res: CustomResponse) => {
  res.send('Success!');
});

app.use('/auth', authRoutes);

// Rotas protegidas
app.use(
  '/protected',
  // @ts-ignore
  authenticateToken,
  (req: CustomRequest, res: CustomResponse) => {
    res.send('This is a protected route');
  },
);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Backend running at ${process.env.BACKEND_URL}`);
});