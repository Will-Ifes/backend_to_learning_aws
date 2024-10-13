import { Request, Response } from 'express';
import AuthService from './AuthLoginService';

class AuthController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const token = await AuthService.login(email, password);
      res.json({ token });
    } catch (error) {
      console.error('Error in login:', error);
      res.status(401).json({ message: (error as Error).message });
    }
  }

  static async register(req: Request, res: Response) {
    const { email, password, name, tenantId } = req.body;
    try {
      const user = await AuthService.register(email, password, name, tenantId);
      res.json(user);
    } catch (error) {
      console.error('Error in register:', error);
      res.status(400).json({ message: (error as Error).message });
    }
  }
}

export default AuthController;