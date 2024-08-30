const db = require('../config/db.config');
const { createNewUser: createNewUserQuery, findUserByEmail: findUserByEmailQuery } = require('../database/queries');
const { logger } = require('../utils/logger');

class User {
    constructor(nombre, email, password) {
        this.nombre = nombre;
        this.email = email;
        this.password = password;
    }

    static create(newUser, cb) {
        db.query(createNewUserQuery, [
            newUser.nombre,
            newUser.email,
            newUser.password
        ], (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            cb(null, {
                id: res.insertId,
                nombre: newUser.nombre,
                email: newUser.email,
            });
        });
    }

    static findByEmail(email, cb) {
        db.query(findUserByEmailQuery, email, (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            if (res.length) {
                cb(null, res[0]);
                return;
            }
            cb({ kind: "not_found" }, null);
        })
    }
}

module.exports = User;
