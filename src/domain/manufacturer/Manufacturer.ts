export interface Manufacturer {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    tenantId: number;
  }