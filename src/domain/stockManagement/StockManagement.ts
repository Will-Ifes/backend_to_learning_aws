export interface StockManagement {
  id: number;
  productId: number;
  quantity: number;
  location: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  tenantId: number;
}