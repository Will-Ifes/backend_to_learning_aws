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

const app = express();

// Middleware para parsing de JSON
app.use(express.json());

// Middleware para parsing de URL-encoded
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/employees', employeeRoutes);
app.use('/addresses', addressRoutes);
app.use('/suppliers', supplierRoutes);
app.use('/products', productRoutes);
app.use('/stock-managements', stockManagementRoutes);
app.use('/sectors', sectorRoutes);
app.use('/positions', positionsRoutes);
app.use('/activation-codes', activationCodeRoutes);
app.use('/access-groups', accessGroupRoutes);
app.use('/permissions', permissionRoutes);

export default app;