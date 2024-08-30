const express = require('express');
const router = express.Router();
const roleController = require('../controllers/rol.controller');

router.post('/roles', roleController.createRole);
router.get('/roles', roleController.getAllRoles);
router.put('/roles/:id', roleController.updateRole); // Ruta para actualizar
router.delete('/roles/:id', roleController.deleteRole); // Ruta para eliminar

module.exports = router;