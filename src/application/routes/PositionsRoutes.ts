import { Router } from 'express';
import { getPositions, getPositionById, createPosition, updatePosition, deletePosition } from '../../domain/positions/PositionsController';

const router = Router();

router.get('/', getPositions);
router.get('/:id', getPositionById);
router.post('/', createPosition);
router.put('/:id', updatePosition);
router.delete('/:id', deletePosition);

export default router;