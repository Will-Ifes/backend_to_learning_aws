import { Request, Response } from 'express';
import { getAllAccessGroups, getAccessGroup, createNewAccessGroup, updateExistingAccessGroup, deleteExistingAccessGroup } from './AccessGroupService';

export const getAccessGroups = async (req: Request, res: Response) => {
  try {
    const accessGroups = await getAllAccessGroups();
    res.json(accessGroups);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch access groups' });
  }
};

export const getAccessGroupById = async (req: Request, res: Response) => {
  try {
    const accessGroup = await getAccessGroup(Number(req.params.id));
    if (accessGroup) {
      res.json(accessGroup);
    } else {
      res.status(404).json({ error: 'Access group not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch access group' });
  }
};

export const createAccessGroup = async (req: Request, res: Response) => {
  try {
    const accessGroup = await createNewAccessGroup(req.body);
    res.status(201).json(accessGroup);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create access group' });
  }
};

export const updateAccessGroup = async (req: Request, res: Response) => {
  try {
    const accessGroup = await updateExistingAccessGroup(Number(req.params.id), req.body);
    if (accessGroup) {
      res.json(accessGroup);
    } else {
      res.status(404).json({ error: 'Access group not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update access group' });
  }
};

export const deleteAccessGroup = async (req: Request, res: Response) => {
  try {
    const accessGroup = await deleteExistingAccessGroup(Number(req.params.id));
    if (accessGroup) {
      res.json({ message: 'Access group deleted successfully' });
    } else {
      res.status(404).json({ error: 'Access group not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete access group' });
  }
};