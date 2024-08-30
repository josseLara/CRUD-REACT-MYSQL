const UsuarioRol = require('../models/userRol.module');

exports.createRole = async(req, res) => {
    const { nombre, apellido, telefono, rol } = req.body;

    try {
        const roleId = await UsuarioRol.create({ nombre, apellido, telefono, rol });
        res.status(201).send({ message: 'Role was created successfully!', roleId });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getAllRoles = async(req, res) => {
    try {
        const roles = await UsuarioRol.findAll();
        res.status(200).json(roles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateRole = async(req, res) => {
    const { id } = req.params;
    const { nombre, apellido, telefono, rol } = req.body;

    try {
        const rowsAffected = await UsuarioRol.update(id, { nombre, apellido, telefono, rol });
        if (rowsAffected > 0) {
            res.status(200).send({ message: 'Role was updated successfully!' });
        } else {
            res.status(404).send({ message: 'Role not found' });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.deleteRole = async(req, res) => {
    const { id } = req.params;

    try {
        const rowsAffected = await UsuarioRol.delete(id);
        if (rowsAffected > 0) {
            res.status(200).send({ message: 'Role was deleted successfully!' });
        } else {
            res.status(404).send({ message: 'Role not found' });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};