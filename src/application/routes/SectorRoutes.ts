import { Router } from 'express';
import { getSectors, getSectorById, createSector, updateSector, deleteSector } from '../../domain/sector/SectorController';

const router = Router();

router.get('/', getSectors);
router.get('/:id', getSectorById);
router.post('/', createSector);
router.put('/:id', updateSector);
router.delete('/:id', deleteSector);

export default router;