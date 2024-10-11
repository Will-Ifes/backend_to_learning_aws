export interface Address {
  id: number;
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  tenantId: number;
}