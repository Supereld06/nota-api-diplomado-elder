import 'dotenv/config';
import express from 'express';
import cors from 'cors';    
import 'express-async-errors';
import morgan from 'morgan';

import { loggerMiddleware } from './presentation/middlewares/logger.middleware.js';
import noteRoutes from './presentation/routes/note.routes.js';
import authRoutes from './presentation/routes/auth.routes.js';

import { connectMongo } from './infrastructure/database/mongo/connection.js';
import { connectMysql } from './infrastructure/database/mysql/connection.js';

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);
app.use(morgan('dev'));

// rutas
app.use('/uploads', express.static('uploads'));
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/notes', noteRoutes);

// health
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'API de notas activa' });
});

// middleware de errores (solo uno)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// iniciar servidor correctamente
const startServer = async () => {
  try {
    await connectMongo();
    await connectMysql();

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(` Servidor escuchando en el puerto ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Error al iniciar servidor:", error);
  }
};

startServer();