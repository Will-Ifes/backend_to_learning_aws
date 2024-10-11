import { Request, Response } from 'express';
import { getAllSectors, getSector, createNewSector, updateExistingSector, deleteExistingSector } from './SectorService';

export const getSectors = async (req: Request, res: Response) => {
  try {
    const sectors = await getAllSectors();
    res.json(sectors);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sectors' });
  }
};

export const getSectorById = async (req: Request, res: Response) => {
  try {
    const sector = await getSector(Number(req.params.id));
    if (sector) {
      res.json(sector);
    } else {
      res.status(404).json({ error: 'Sector not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sector' });
  }
};

export const createSector = async (req: Request, res: Response) => {
  try {
    const sector = await createNewSector(req.body);
    res.status(201).json(sector);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create sector' });
  }
};

export const updateSector = async (req: Request, res: Response) => {
  try {
    const sector = await updateExistingSector(Number(req.params.id), req.body);
    if (sector) {
      res.json(sector);
    } else {
      res.status(404).json({ error: 'Sector not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update sector' });
  }
};

export const deleteSector = async (req: Request, res: Response) => {
  try {
    const sector = await deleteExistingSector(Number(req.params.id));
    if (sector) {
      res.json({ message: 'Sector deleted successfully' });
    } else {
      res.status(404).json({ error: 'Sector not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete sector' });
  }
};