export interface Tenant {
  id: number;
  name: string;
  cnpj: string;
  email: string;
  address: string | null;
  contact: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}