const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nombre: String,
    correo: String,
    contrasena: String,
    rol: {
        type: String,
        enum: ['cliente', 'admin'],
        default: 'cliente'
    }
});

module.exports = mongoose.model('Usuario', usuarioSchema);


/*
const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true,
        unique: true
    },
    contrasena: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        default: 'cliente', // puede ser 'cliente' o 'admin'
        enum: ['cliente', 'admin']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Usuario', usuarioSchema);
*/