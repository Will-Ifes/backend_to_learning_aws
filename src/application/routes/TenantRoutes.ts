import { Router } from 'express';
import { getTenants, getTenantById, createTenant, updateTenant, deleteTenant } from '../../domain/tenant/TenantController';

const router = Router();

router.get('/', getTenants);
router.get('/:id', getTenantById);
router.post('/', createTenant);
router.put('/:id', updateTenant);
router.delete('/:id', deleteTenant);

export default router;