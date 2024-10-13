export interface ActivationCode {
  id: number;
  code: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  tenantId: number;
}