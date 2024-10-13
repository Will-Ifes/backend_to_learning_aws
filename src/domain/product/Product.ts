export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  brand: string | null;
  unit: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  supplierId: number;
  manufacturerId: number;
  tenantId: number;
  image: Buffer | null;
}