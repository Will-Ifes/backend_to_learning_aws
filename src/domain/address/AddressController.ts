import { Request, Response } from 'express';
import { getAllAddresses, getAddress, createNewAddress, updateExistingAddress, deleteExistingAddress } from './AddressService';

export const getAddresses = async (req: Request, res: Response) => {
  try {
    const addresses = await getAllAddresses();
    res.json(addresses);
  } catch (error) {
    console.error('Error fetching addresses:', error);
    res.status(500).json({ error: 'Failed to fetch addresses' });
  }
};

export const getAddressById = async (req: Request, res: Response) => {
  try {
    const address = await getAddress(Number(req.params.id));
    if (address) {
      res.json(address);
    } else {
      res.status(404).json({ error: 'Address not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch address' });
  }
};

export const createAddress = async (req: Request, res: Response) => {
  try {
    const address = await createNewAddress(req.body);
    res.status(201).json(address);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create address' });
  }
};

export const updateAddress = async (req: Request, res: Response) => {
  try {
    const address = await updateExistingAddress(Number(req.params.id), req.body);
    if (address) {
      res.json(address);
    } else {
      res.status(404).json({ error: 'Address not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update address' });
  }
};

export const deleteAddress = async (req: Request, res: Response) => {
  try {
    const address = await deleteExistingAddress(Number(req.params.id));
    if (address) {
      res.json({ message: 'Address deleted successfully' });
    } else {
      res.status(404).json({ error: 'Address not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete address' });
  }
};