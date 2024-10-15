import { Router } from 'express';
import { getAccessGroups, getAccessGroupById, createAccessGroup, updateAccessGroup, deleteAccessGroup } from '../../domain/accessGroup/AccessGroupController';

const router = Router();

router.get('/', getAccessGroups);
router.get('/:id', getAccessGroupById);
router.post('/', createAccessGroup);
router.put('/:id', updateAccessGroup);
router.delete('/:id', deleteAccessGroup);

export default router;