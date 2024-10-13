import { Router } from 'express';
import { getUsers, getByEmail,getUserById, createUser, updateUser, deleteUser } from '../../domain/user/UserController';

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.get('/:email', getByEmail);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;