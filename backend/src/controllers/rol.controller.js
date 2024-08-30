const Role = require('../models/rol.model');

exports.createRole = async(req, res) => {
    const { tipo } = req.body;

    try {
        const roleId = await Role.create(tipo);
        res.status(201).send({ message: 'Role was created successfully!', roleId });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getAllRoles = async(req, res) => {
    try {
        const roles = await Role.findAll();
        res.status(200).json(roles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateRole = async(req, res) => {
    const { id } = req.params;
    const { tipo } = req.body;

    try {
        const affectedRows = await Role.update(id, tipo);
        if (affectedRows > 0) {
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
        const affectedRows = await Role.delete(id);
        if (affectedRows > 0) {
            res.status(200).send({ message: 'Role was deleted successfully!' });
        } else {
            res.status(404).send({ message: 'Role not found' });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};