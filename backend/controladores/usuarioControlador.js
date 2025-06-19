const Usuario = require('../modelos/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registrar usuario
exports.registrar = async (req, res) => {
    try {
        const { nombre, correo, contrasena, rol } = req.body;

        const existe = await Usuario.findOne({ correo });
        if (existe) return res.status(400).json({ mensaje: 'El correo ya está registrado' });

        const hashedPassword = await bcrypt.hash(contrasena, 10);

        // Si no se envía rol, se asume 'cliente'
        const nuevoUsuario = new Usuario({
            nombre,
            correo,
            contrasena: hashedPassword,
            rol: rol || 'cliente'
        });

        await nuevoUsuario.save();

        res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al registrar usuario', error });
    }
};

// Login usuario o admin
exports.login = async (req, res) => {
    try {
        const { correo, contrasena } = req.body;

        const usuario = await Usuario.findOne({ correo });
        if (!usuario) return res.status(404).json({ mensaje: 'Correo no registrado' });

        const esValido = await bcrypt.compare(contrasena, usuario.contrasena);
        if (!esValido) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });

        const token = jwt.sign(
            { id: usuario._id, rol: usuario.rol },
            'secreto',
            { expiresIn: '2h' }
        );

        res.json({
            token,
            usuario: {
                id: usuario._id,
                nombre: usuario.nombre,
                rol: usuario.rol
            }
        });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al iniciar sesión', error });
    }
};

// Obtener todos los usuarios (solo admins)
exports.listarUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find().select('-contrasena');
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener usuarios', error });
    }
};

// Eliminar usuario por ID
exports.eliminarUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findByIdAndDelete(req.params.id);
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        res.json({ mensaje: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el usuario', error });
    }
};