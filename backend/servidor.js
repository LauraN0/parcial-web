const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const conectarDB = require('./config/db');

// Importar rutas
const usuarioRutas = require('./rutas/usuarioRutas');
const productoRutas = require('./rutas/productoRutas');

// Cargar variables de entorno
dotenv.config();

// Conectar a MongoDB
conectarDB();

const app = express();

// Middleware para CORS y JSON
app.use(cors({
  origin: 'http://137.184.206.51:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});
app.use(express.json());

app.use('/uploads', express.static('uploads'));
app.use('/api/usuarios', usuarioRutas);
app.use('/api/productos', productoRutas);

// Ruta raíz de prueba
app.get('/', (req, res) => {
    res.send('Servidor backend funcionando correctamente');
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
