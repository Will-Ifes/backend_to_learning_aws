import { Router } from 'express';
import { getManufacturers, getManufacturerById, createManufacturer, updateManufacturer, deleteManufacturer } from '../../domain/manufacturer/ManufacturerController';

const router = Router();

router.get('/', getManufacturers);
router.get('/:id', getManufacturerById);
router.post('/', createManufacturer);
router.put('/:id', updateManufacturer);
router.delete('/:id', deleteManufacturer);

export default router;