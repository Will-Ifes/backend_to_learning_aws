import { Request, Response } from 'express';
import { getAllPermissions, getPermission, createNewPermission, updateExistingPermission, deleteExistingPermission } from './PermissionService';

export const getPermissions = async (req: Request, res: Response) => {
  try {
    const permissions = await getAllPermissions();
    res.json(permissions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch permissions' });
  }
};

export const getPermissionById = async (req: Request, res: Response) => {
  try {
    const permission = await getPermission(Number(req.params.id));
    if (permission) {
      res.json(permission);
    } else {
      res.status(404).json({ error: 'Permission not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch permission' });
  }
};

export const createPermission = async (req: Request, res: Response) => {
  try {
    const permission = await createNewPermission(req.body);
    res.status(201).json(permission);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create permission' });
  }
};

export const updatePermission = async (req: Request, res: Response) => {
  try {
    const permission = await updateExistingPermission(Number(req.params.id), req.body);
    if (permission) {
      res.json(permission);
    } else {
      res.status(404).json({ error: 'Permission not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update permission' });
  }
};

export const deletePermission = async (req: Request, res: Response) => {
  try {
    const permission = await deleteExistingPermission(Number(req.params.id));
    if (permission) {
      res.json({ message: 'Permission deleted successfully' });
    } else {
      res.status(404).json({ error: 'Permission not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete permission' });
  }
};