import { Request, Response } from 'express';
import { getAllPositions, getPosition, createNewPosition, updateExistingPosition, deleteExistingPosition } from './PositionsService';

export const getPositions = async (req: Request, res: Response) => {
  try {
    const positions = await getAllPositions();
    res.json(positions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch positions' });
  }
};

export const getPositionById = async (req: Request, res: Response) => {
  try {
    const position = await getPosition(Number(req.params.id));
    if (position) {
      res.json(position);
    } else {
      res.status(404).json({ error: 'Position not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch position' });
  }
};

export const createPosition = async (req: Request, res: Response) => {
  try {
    const position = await createNewPosition(req.body);
    res.status(201).json(position);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create position' });
  }
};

export const updatePosition = async (req: Request, res: Response) => {
  try {
    const position = await updateExistingPosition(Number(req.params.id), req.body);
    if (position) {
      res.json(position);
    } else {
      res.status(404).json({ error: 'Position not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update position' });
  }
};

export const deletePosition = async (req: Request, res: Response) => {
  try {
    const position = await deleteExistingPosition(Number(req.params.id));
    if (position) {
      res.json({ message: 'Position deleted successfully' });
    } else {
      res.status(404).json({ error: 'Position not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete position' });
  }
};