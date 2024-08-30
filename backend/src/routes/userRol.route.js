const express = require('express');
const router = express.Router();
const userRoleController = require('../controllers/userRol.controller');

router.post('/userRoles', userRoleController.createRole);
router.get('/userRoles', userRoleController.getAllRoles);
router.put('/userRoles/:id', userRoleController.updateRole); // Ruta para actualizar
router.delete('/userRoles/:id', userRoleController.deleteRole); // Ruta para eliminar

module.exports = router;