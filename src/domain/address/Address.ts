export interface Address {
  id: number;
  cep: string;
  street: string;
  neighborhood: string;
  number: string;
  city: string;
  state: string;
  country: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}