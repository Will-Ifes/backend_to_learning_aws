import fs from 'fs';
import https from 'https';
import app from './App';
import path from 'path';

const PORT = process.env.PORT || 3333;

// Carregar os arquivos do certificado e da chave privada
const privateKey = fs.readFileSync(path.resolve(__dirname, '../../../privateCertificate.key'), 'utf8');
const certificate = fs.readFileSync(path.resolve(__dirname, '../../../certificate.crt'), 'utf8');

const credentials = { key: privateKey, cert: certificate };

// Criar o servidor HTTPS
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(PORT, () => {
  console.log(`HTTPS Server is running on port ${PORT}`);
});