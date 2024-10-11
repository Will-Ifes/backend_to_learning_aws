import { Router } from 'express';
import { getStockManagements, getStockManagementById, createStockManagement, updateStockManagement, deleteStockManagement } from '../../domain/stockManagement/StockManagementController';

const router = Router();

router.get('/', getStockManagements);
router.get('/:id', getStockManagementById);
router.post('/', createStockManagement);
router.put('/:id', updateStockManagement);
router.delete('/:id', deleteStockManagement);

export default router;