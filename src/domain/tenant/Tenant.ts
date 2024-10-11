export interface Tenant {
    id: number;
    name: string;
    cnpj: string;
    email: string;
    address?: string;
    contact?: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
  }