const express = require('express');
const router = express.Router();
const usuarioCtrl = require('../controladores/usuarioControlador');
const { verificarToken, verificarAdmin } = require('../middlewares/authMiddlewares');

// Ruta: POST /api/usuarios/registrar
router.post('/registrar', usuarioCtrl.registrar);

// Ruta: POST /api/usuarios/login
router.post('/login', usuarioCtrl.login);

// Ruta: GET /api/usuarios/usuarios - protegida por token y admin
router.get('/usuarios', verificarToken, verificarAdmin, usuarioCtrl.listarUsuarios);

// Ruta: DELETE /api/usuarios/:id
router.delete('/:id', usuarioCtrl.eliminarUsuario);

module.exports = router;