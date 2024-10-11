export interface Supplier {
  id: number;
  name: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  tenantId: number;
}