import { encrypt, decrypt } from './src/infrastructure/crypto/crypto';
import { config } from 'dotenv';

config();

const testEncryption = () => {
  const text = 'Hello, World!';
  const encryptedText = encrypt(text);
  const decryptedText = decrypt(encryptedText);

  console.log('Texto Original:', text);
  console.log('Texto Criptografado:', encryptedText);
  console.log('Texto Descriptografado:', decryptedText);

  if (text === decryptedText) {
    console.log('Criptografia e Descriptografia funcionaram corretamente.');
  } else {
    console.log('Houve um problema com a Criptografia ou Descriptografia.');
  }
};

testEncryption();