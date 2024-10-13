import crypto from 'crypto';
import { config } from 'dotenv';

config();

const algorithm = 'aes-256-cbc';
const key_crypto = process.env.CRYPTO_KEY;

if (!key_crypto) {
  throw new Error('CRYPTO_KEY não está definido no arquivo .env');
}

const key = Buffer.from(key_crypto, 'hex'); // Chave de 32 bytes

export const encrypt = (text: string): string => {
  console.log('Encrypting text:', text);
  const iv = crypto.randomBytes(16); // Vetor de inicialização de 16 bytes
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const encryptedText = `${iv.toString('hex')}:${encrypted}`;
  console.log('Encrypted text:', encryptedText);
  return encryptedText;
};

export const decrypt = (text: string): string => {
  console.log('Decrypting text:', text);
  const [ivHex, encryptedText] = text.split(':');
  if (!ivHex || !encryptedText) {
    throw new Error('Texto criptografado inválido');
  }
  const iv = Buffer.from(ivHex, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  console.log('Decrypted text:', decrypted);
  return decrypted;
};