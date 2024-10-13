export interface Supplier {
  id: number;
  name: string;
  cnpj: string;
  phone: string;
  email: string;
  contact: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  addressId: number;
  tenantId: number;
}