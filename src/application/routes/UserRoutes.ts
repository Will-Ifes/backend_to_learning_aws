import { Router } from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../../domain/user/UserController';

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;