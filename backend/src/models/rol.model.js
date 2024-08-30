const connection = require('../config/db.config');

const Role = {};

Role.create = async(tipo) => {
    try {
        const result = await new Promise((resolve, reject) => {
            connection.query('INSERT INTO rol (tipo) VALUES (?)', [tipo], (error, results) => {
                if (error) reject(error);
                else resolve(results);
            });
        });
        return result.insertId;
    } catch (error) {
        throw error;
    }
};

Role.findAll = async() => {
    try {
        const rows = await new Promise((resolve, reject) => {
            connection.query('SELECT * FROM rol', (error, results) => {
                if (error) reject(error);
                else resolve(results);
            });
        });
        return rows || [];
    } catch (error) {
        throw error;
    }
};

Role.update = async(id, tipo) => {
    try {
        const result = await new Promise((resolve, reject) => {
            connection.query('UPDATE rol SET tipo = ? WHERE id = ?', [tipo, id], (error, results) => {
                if (error) reject(error);
                else resolve(results);
            });
        });
        return result.affectedRows;
    } catch (error) {
        throw error;
    }
};

Role.delete = async(id) => {
    try {
        const result = await new Promise((resolve, reject) => {
            connection.query('DELETE FROM rol WHERE id = ?', [id], (error, results) => {
                if (error) reject(error);
                else resolve(results);
            });
        });
        return result.affectedRows;
    } catch (error) {
        throw error;
    }
};

module.exports = Role;