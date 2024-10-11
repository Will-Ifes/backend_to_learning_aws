export interface AccessGroup {
  id: number | null;
  name: string | null;
  createdAt: Date | null;
  updatedAt: Date | null | null;
  deletedAt?: Date |  null;
  tenantId: number | null;
}