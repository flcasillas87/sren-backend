import express from 'express';
import userRoutes from './routes/userRoutes.js';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`🚀 Servidor en http://localhost:${port}`);
});
