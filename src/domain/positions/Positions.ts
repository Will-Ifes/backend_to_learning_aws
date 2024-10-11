export interface Position {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  tenantId: number;
}