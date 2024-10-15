import AuthRepository from './AuthLoginRepository';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class AuthController {
  static async login(email: string, password: string): Promise<string> {
    const user = await AuthRepository.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign({ id: user.id, email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });
    return token;
  }

  static async register(email: string, password: string, name: string, tenantId: number) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await AuthRepository.create({
      email, password: hashedPassword, name, tenantId, status: "ACTIVE",
      employeeId: null
    });
    return user;
  }
}

export default AuthController;