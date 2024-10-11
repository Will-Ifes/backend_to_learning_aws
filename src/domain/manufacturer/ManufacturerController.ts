import { Request, Response } from 'express';
import { getAllManufacturers, getManufacturer, createNewManufacturer, updateExistingManufacturer, deleteExistingManufacturer } from './ManufacturerService';

export const getManufacturers = async (req: Request, res: Response) => {
  try {
    const manufacturers = await getAllManufacturers();
    res.json(manufacturers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch manufacturers' });
  }
};

export const getManufacturerById = async (req: Request, res: Response) => {
  try {
    const manufacturer = await getManufacturer(Number(req.params.id));
    if (manufacturer) {
      res.json(manufacturer);
    } else {
      res.status(404).json({ error: 'Manufacturer not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch manufacturer' });
  }
};

export const createManufacturer = async (req: Request, res: Response) => {
  try {
    const manufacturer = await createNewManufacturer(req.body);
    res.status(201).json(manufacturer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create manufacturer' });
  }
};

export const updateManufacturer = async (req: Request, res: Response) => {
  try {
    const manufacturer = await updateExistingManufacturer(Number(req.params.id), req.body);
    if (manufacturer) {
      res.json(manufacturer);
    } else {
      res.status(404).json({ error: 'Manufacturer not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update manufacturer' });
  }
};

export const deleteManufacturer = async (req: Request, res: Response) => {
  try {
    const manufacturer = await deleteExistingManufacturer(Number(req.params.id));
    if (manufacturer) {
      res.json({ message: 'Manufacturer deleted successfully' });
    } else {
      res.status(404).json({ error: 'Manufacturer not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete manufacturer' });
  }
};