export interface StockManagement {
  id: number;
  type: "ENTRY" | "EXIT";
  date: Date;
  quantity: number;
  value: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  productId: number;
  userId: number;
  tenantId: number;
}