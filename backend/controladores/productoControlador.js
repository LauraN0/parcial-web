const fs = require('fs');
const Producto = require('../modelos/Producto');

/* ---------- Crear ---------- */
exports.crearProducto = async (req, res) => {
    try {
        const { nombre, descripcion, precio, categoria, stock } = req.body;
        const producto = new Producto({
            nombre, descripcion, precio, categoria, stock,
            imagen: req.file ? req.file.filename : ''
        });
        await producto.save();
        return res.status(201).json(producto);
    } catch (err) {
        return res.status(500).json({ mensaje: 'Error al crear producto', err });
    }
};

/* ---------- Leer ---------- */
exports.obtenerProductos = async (_req, res) => {
    try {
        const productos = await Producto.find();
        return res.json(productos);
    } catch (err) {
        return res.status(500).json({ mensaje: 'Error al obtener productos', err });
    }
};

exports.obtenerProducto = async (req, res) => {
    try {
        const p = await Producto.findById(req.params.id);
        if (!p) return res.status(404).json({ mensaje: 'Producto no encontrado' });
        return res.json(p);
    } catch (err) {
        return res.status(500).json({ mensaje: 'Error al obtener producto', err });
    }
};

/* ---------- Actualizar ---------- */
exports.actualizarProducto = async (req, res) => {
    try {
        const p = await Producto.findById(req.params.id);
        if (!p) return res.status(404).json({ mensaje: 'Producto no encontrado' });

        if (req.file) { // 🔄 imagen
            if (p.imagen) fs.unlinkSync(`uploads/${p.imagen}`);
            p.imagen = req.file.filename;
        }

        const { nombre, descripcion, precio, categoria, stock } = req.body;
        Object.assign(p, { nombre, descripcion, precio, categoria, stock });

        await p.save();
        return res.json({ mensaje: 'Producto actualizado' });
    } catch (err) {
        return res.status(500).json({ mensaje: 'Error al actualizar producto', err });
    }
};

/* ---------- Eliminar ---------- */
exports.eliminarProducto = async (req, res) => {
    try {
        const p = await Producto.findByIdAndDelete(req.params.id);
        if (!p) return res.status(404).json({ mensaje: 'Producto no encontrado' });
        if (p.imagen) fs.unlinkSync(`uploads/${p.imagen}`);
        return res.json({ mensaje: 'Producto eliminado' });
    } catch (err) {
        return res.status(500).json({ mensaje: 'Error al eliminar producto', err });
    }
};

/* ---------- Stock (–1 / +1) ---------- */
const cambiarStock = async (req, res, cantidad) => {
    try {
        const p = await Producto.findById(req.params.id);
        if (!p) return res.status(404).json({ mensaje: 'Producto no encontrado' });

        const nuevoStock = p.stock + cantidad;
        if (nuevoStock < 0) return res.status(400).json({ mensaje: 'Stock insuficiente' });

        p.stock = nuevoStock;
        await p.save();
        return res.json({ mensaje: 'Stock actualizado', stock: p.stock });
    } catch (err) {
        return res.status(500).json({ mensaje: 'Error al cambiar stock', err });
    }
};

exports.disminuirStock = (req, res) => cambiarStock(req, res, -1);
//exports.aumentarStock = (req, res) => cambiarStock(req, res, 1);

// Aumentar stock
exports.aumentarStock = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);
        if (!producto) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }

        producto.stock += 1;
        await producto.save();

        res.json({ mensaje: 'Stock aumentado', stock: producto.stock });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al aumentar stock', error });
    }
};

