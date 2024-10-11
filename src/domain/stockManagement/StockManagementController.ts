import { Request, Response } from 'express';
import { getAllStockManagements, getStockManagement, createNewStockManagement, updateExistingStockManagement, deleteExistingStockManagement } from './StockManagementService';

export const getStockManagements = async (req: Request, res: Response) => {
  try {
    const stockManagements = await getAllStockManagements();
    res.json(stockManagements);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stock managements' });
  }
};

export const getStockManagementById = async (req: Request, res: Response) => {
  try {
    const stockManagement = await getStockManagement(Number(req.params.id));
    if (stockManagement) {
      res.json(stockManagement);
    } else {
      res.status(404).json({ error: 'Stock management not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stock management' });
  }
};

export const createStockManagement = async (req: Request, res: Response) => {
  try {
    const stockManagement = await createNewStockManagement(req.body);
    res.status(201).json(stockManagement);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create stock management' });
  }
};

export const updateStockManagement = async (req: Request, res: Response) => {
  try {
    const stockManagement = await updateExistingStockManagement(Number(req.params.id), req.body);
    if (stockManagement) {
      res.json(stockManagement);
    } else {
      res.status(404).json({ error: 'Stock management not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update stock management' });
  }
};

export const deleteStockManagement = async (req: Request, res: Response) => {
  try {
    const stockManagement = await deleteExistingStockManagement(Number(req.params.id));
    if (stockManagement) {
      res.json({ message: 'Stock management deleted successfully' });
    } else {
      res.status(404).json({ error: 'Stock management not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete stock management' });
  }
};