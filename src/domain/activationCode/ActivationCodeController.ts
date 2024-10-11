import { Request, Response } from 'express';
import { getAllActivationCodes, getActivationCode, createNewActivationCode, updateExistingActivationCode, deleteExistingActivationCode } from './ActivationCodeService';

export const getActivationCodes = async (req: Request, res: Response) => {
  try {
    const activationCodes = await getAllActivationCodes();
    res.json(activationCodes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activation codes' });
  }
};

export const getActivationCodeById = async (req: Request, res: Response) => {
  try {
    const activationCode = await getActivationCode(Number(req.params.id));
    if (activationCode) {
      res.json(activationCode);
    } else {
      res.status(404).json({ error: 'Activation code not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activation code' });
  }
};

export const createActivationCode = async (req: Request, res: Response) => {
  try {
    const activationCode = await createNewActivationCode(req.body);
    res.status(201).json(activationCode);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create activation code' });
  }
};

export const updateActivationCode = async (req: Request, res: Response) => {
  try {
    const activationCode = await updateExistingActivationCode(Number(req.params.id), req.body);
    if (activationCode) {
      res.json(activationCode);
    } else {
      res.status(404).json({ error: 'Activation code not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update activation code' });
  }
};

export const deleteActivationCode = async (req: Request, res: Response) => {
  try {
    const activationCode = await deleteExistingActivationCode(Number(req.params.id));
    if (activationCode) {
      res.json({ message: 'Activation code deleted successfully' });
    } else {
      res.status(404).json({ error: 'Activation code not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete activation code' });
  }
};