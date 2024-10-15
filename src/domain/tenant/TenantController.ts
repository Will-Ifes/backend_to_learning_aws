import { Request, Response } from 'express';
import { getAllTenants, getTenant, createNewTenant, updateExistingTenant, deleteExistingTenant } from './TenantService';

export const getTenants = async (req: Request, res: Response) => {
  try {
    const tenants = await getAllTenants();
    res.json(tenants);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tenants' });
  }
};

export const getTenantById = async (req: Request, res: Response) => {
  try {
    const tenant = await getTenant(Number(req.params.id));
    if (tenant) {
      res.json(tenant);
    } else {
      res.status(404).json({ error: 'Tenant not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tenant' });
  }
};

export const createTenant = async (req: Request, res: Response) => {
  try {
    const tenant = await createNewTenant(req.body);
    res.status(201).json(tenant);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create tenant' });
  }
};

export const updateTenant = async (req: Request, res: Response) => {
  try {
    const tenant = await updateExistingTenant(Number(req.params.id), req.body);
    if (tenant) {
      res.json(tenant);
    } else {
      res.status(404).json({ error: 'Tenant not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update tenant' });
  }
};

export const deleteTenant = async (req: Request, res: Response) => {
  try {
    const tenant = await deleteExistingTenant(Number(req.params.id));
    if (tenant) {
      res.json({ message: 'Tenant deleted successfully' });
    } else {
      res.status(404).json({ error: 'Tenant not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete tenant' });
  }
};