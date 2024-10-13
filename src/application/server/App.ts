import express from 'express';
import employeeRoutes from '../routes/EmployeeRoutes';
import addressRoutes from '../routes/AddressRoutes';
import supplierRoutes from '../routes/SupplierRoutes';
import productRoutes from '../routes/ProductRoutes';
import stockManagementRoutes from '../routes/StockManagementRoutes';
import sectorRoutes from '../routes/SectorRoutes';
import positionsRoutes from '../routes/PositionsRoutes';
import activationCodeRoutes from '../routes/ActivationCodeRoutes';
import accessGroupRoutes from '../routes/AccessGroupRoutes';
import permissionRoutes from '../routes/PermissionRoutes';
import userRoutes from '../routes/UserRoutes';
import tenantRoutes from '../routes/TenantRoutes';
import manufacturerRoutes from '../routes/ManufacturerRoutes';
import authRoutes from '../routes/AuthRoutes';
import LoggerFactory from '../../infrastructure/logger/LoggerFactory';

const app = express();
const logger = LoggerFactory.createLogger('App');

// Middleware para parsing de JSON
app.use(express.json());
logger.info('JSON parsing middleware initialized.');

// Middleware para parsing de URL-encoded
app.use(express.urlencoded({ extended: true }));
logger.info('URL-encoded parsing middleware initialized.');

// Rotas
app.use('/employees', employeeRoutes);
logger.info('Employee routes initialized.');
app.use('/addresses', addressRoutes);
logger.info('Address routes initialized.');
app.use('/suppliers', supplierRoutes);
logger.info('Supplier routes initialized.');
app.use('/products', productRoutes);
logger.info('Product routes initialized.');
app.use('/stock-managements', stockManagementRoutes);
logger.info('Stock management routes initialized.');
app.use('/sectors', sectorRoutes);
logger.info('Sector routes initialized.');
app.use('/positions', positionsRoutes);
logger.info('Positions routes initialized.');
app.use('/activation-codes', activationCodeRoutes);
logger.info('Activation code routes initialized.');
app.use('/access-groups', accessGroupRoutes);
logger.info('Access group routes initialized.');
app.use('/permissions', permissionRoutes);
logger.info('Permission routes initialized.');
app.use('/users', userRoutes);
logger.info('User routes initialized.');
app.use('/tenants', tenantRoutes);
logger.info('Tenant routes initialized.');
app.use('/manufacturers', manufacturerRoutes);
logger.info('Manufacturer routes initialized.');
app.use('/auth', authRoutes);
logger.info('Auth routes initialized.');

app.get('/', (req, res) => {
  res.send('Hello World!');
  logger.info('Root route accessed.');
});

export default app;