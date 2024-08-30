const connection = require('../config/db.config');

const UsuarioRol = {};

UsuarioRol.create = async({ nombre, apellido, telefono, rol }) => {
    try {
        const result = await new Promise((resolve, reject) => {
            connection.query(
                'INSERT INTO usuariorol (nombre, apellido, telefono, rol) VALUES (?, ?, ?, ?)', [nombre, apellido, telefono, rol],
                (error, results) => {
                    if (error) reject(error);
                    else resolve(results);
                }
            );
        });
        return result.insertId;
    } catch (error) {
        throw error;
    }
};

UsuarioRol.findAll = async() => {
    try {
        const rows = await new Promise((resolve, reject) => {
            connection.query('SELECT * FROM usuariorol', (error, results) => {
                if (error) reject(error);
                else resolve(results);
            });
        });
        return rows || [];
    } catch (error) {
        throw error;
    }
};

UsuarioRol.update = async(id, { nombre, apellido, telefono, rol }) => {
    try {
        const result = await new Promise((resolve, reject) => {
            connection.query(
                'UPDATE usuariorol SET nombre = ?, apellido = ?, telefono = ?, rol = ? WHERE id = ?', [nombre, apellido, telefono, rol, id],
                (error, results) => {
                    if (error) reject(error);
                    else resolve(results);
                }
            );
        });
        return result.affectedRows;
    } catch (error) {
        throw error;
    }
};

UsuarioRol.delete = async(id) => {
    try {
        const result = await new Promise((resolve, reject) => {
            connection.query('DELETE FROM usuariorol WHERE id = ?', [id], (error, results) => {
                if (error) reject(error);
                else resolve(results);
            });
        });
        return result.affectedRows;
    } catch (error) {
        throw error;
    }
};

module.exports = UsuarioRol;