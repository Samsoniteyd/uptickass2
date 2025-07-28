import { Router } from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser } from '../controller/user.controller';
import { validateUser } from '../middleware/user.validate';

const router = Router();

router.post('/', validateUser, createUser);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;