export interface Employee {
  id: number;
  cpf: string;
  skinColor: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  tenantId: number;
  userId: number;
  addressId: number;
  sectorId: number | null;
  positionId: number | null;
}