const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const productoCtrl = require('../controladores/productoControlador');

/* ---------- Config de subida de imágenes ---------- */
const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, 'uploads/'),
    filename: (_req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

/* ---------- CRUD + stock ---------- */

// Crear producto (imagen opcional)
router.post('/', upload.single('imagen'), productoCtrl.crearProducto);

// Obtener todos
router.get('/', productoCtrl.obtenerProductos);

// Obtener uno
router.get('/:id', productoCtrl.obtenerProducto);

// Actualizar
router.put('/:id', upload.single('imagen'), productoCtrl.actualizarProducto);

// Eliminar
router.delete('/:id', productoCtrl.eliminarProducto);

// ↓↓↓ STOCK ↓↓↓

// Disminuir stock en –1
router.put('/disminuir-stock/:id', productoCtrl.disminuirStock);

// Aumentar stock en +1
router.put('/aumentar-stock/:id', productoCtrl.aumentarStock);

module.exports = router;

