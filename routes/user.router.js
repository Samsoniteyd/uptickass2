const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const validateUser = require('../middleware/validateUser');

router.post('/', validateUser, userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUser);
router.put('/:id', validateUser, userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;