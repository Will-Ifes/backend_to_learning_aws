import express, { Request, Response } from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import { authenticateToken } from './middleware/auth';
import swaggerApp from './swagger';

const app = express();
require('dotenv').config();

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(';') ?? ['*'];

const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin) {
      return callback(null, true);
    }

    const allowed = allowedOrigins.some((allowedOrigin) => {
      const regex = new RegExp(`^${allowedOrigin.replace(/\./g, '\\.').replace(/\*/g, '.*')}`);
      return regex.test(origin);
    });

    if (allowed) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.use(swaggerApp);
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend running at ${process.env.BACKEND_URL}`);
});