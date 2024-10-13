
export interface User {
  id: number;
  status: "ACTIVE" | "INACTIVE";
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  tenantId: number;
  employeeId?: number | null;
}