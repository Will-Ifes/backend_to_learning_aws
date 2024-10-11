import { Router } from 'express';
import { getActivationCodes, getActivationCodeById, createActivationCode, updateActivationCode, deleteActivationCode } from '../../domain/activationCode/ActivationCodeController';

const router = Router();

router.get('/', getActivationCodes);
router.get('/:id', getActivationCodeById);
router.post('/', createActivationCode);
router.put('/:id', updateActivationCode);
router.delete('/:id', deleteActivationCode);

export default router;