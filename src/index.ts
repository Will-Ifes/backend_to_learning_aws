import express, { Request, Response } from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import { authenticateToken } from './middleware/auth';

const app = express();
require('dotenv').config();

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(';') ?? '';

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['*'], // defina os métodos permitidos
    credentials: true, // se precisar enviar cookies/sessões
  }),
);

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
