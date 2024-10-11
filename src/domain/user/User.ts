export interface User {
  id: number;
  status: string;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  tenantId: number;
  employeeId?: number;
}