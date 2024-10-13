import crypto from 'crypto';

const algorithm = 'aes-256-ctr';
const secretKey = crypto.createHash('sha256').update(String(process.env.CRYPTO_KEY || 'your_secret_key')).digest('base64').substr(0, 32);

export const encrypt = (text: string): string => {
  const iv = Buffer.alloc(16, 0); // Usar um IV fixo para garantir a determinística
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  const result = `${iv.toString('hex')}:${encrypted.toString('hex')}`;
  console.log(`Encrypting text: ${text}`);
  console.log(`Encrypted text: ${result}`);
  return result;
};

export const decrypt = (hash: string): string => {
  const [iv, encryptedText] = hash.split(':');
  const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(iv, 'hex'));
  const decrypted = Buffer.concat([decipher.update(Buffer.from(encryptedText, 'hex')), decipher.final()]);
  const result = decrypted.toString();
  console.log(`Decrypting text: ${hash}`);
  console.log(`Decrypted text: ${result}`);
  return result;
};