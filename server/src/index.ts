import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'CBLZ Landing Page Builder API 🚀',
    version: '0.1.0',
    status: 'online',
  });
});

// placeholder route untuk landing page
app.get('/api/hello', (req: Request, res: Response) => {
  res.json({ hello: 'world' });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
