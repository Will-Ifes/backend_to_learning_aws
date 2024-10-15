export interface Permission {
  id: number;
  name: string;
  url: string;
  label: string;
  listChecked: boolean;
  createChecked: boolean;
  updateChecked: boolean;
  deleteChecked: boolean;
  hasListOption: boolean;
  hasDeleteOption: boolean;
  hasCreateOption: boolean;
  hasUpdateOption: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  accessGroupId: number;
}