import { Request, Response } from 'express';
import { getAllSuppliers, getSupplier, createNewSupplier, updateExistingSupplier, deleteExistingSupplier } from './SupplierService';

export const getSuppliers = async (req: Request, res: Response) => {
  try {
    const suppliers = await getAllSuppliers();
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch suppliers' });
  }
};

export const getSupplierById = async (req: Request, res: Response) => {
  try {
    const supplier = await getSupplier(Number(req.params.id));
    if (supplier) {
      res.json(supplier);
    } else {
      res.status(404).json({ error: 'Supplier not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch supplier' });
  }
};

export const createSupplier = async (req: Request, res: Response) => {
  try {
    const supplier = await createNewSupplier(req.body);
    res.status(201).json(supplier);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create supplier' });
  }
};

export const updateSupplier = async (req: Request, res: Response) => {
  try {
    const supplier = await updateExistingSupplier(Number(req.params.id), req.body);
    if (supplier) {
      res.json(supplier);
    } else {
      res.status(404).json({ error: 'Supplier not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update supplier' });
  }
};

export const deleteSupplier = async (req: Request, res: Response) => {
  try {
    const supplier = await deleteExistingSupplier(Number(req.params.id));
    if (supplier) {
      res.json({ message: 'Supplier deleted successfully' });
    } else {
      res.status(404).json({ error: 'Supplier not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete supplier' });
  }
};