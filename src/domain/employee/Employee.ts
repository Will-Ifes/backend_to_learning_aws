export interface Employee {
  id: number;
  name: string;
  email: string;
  position: string;
  salary: number;
  hireDate: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  tenantId: number;
}