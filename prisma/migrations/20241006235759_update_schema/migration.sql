/*
  Warnings:

  - A unique constraint covering the columns `[cnpj]` on the table `Supplier` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cnpj]` on the table `Tenant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cpf]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `cnpj` on table `Supplier` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `Supplier` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `Supplier` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `Supplier` required. This step will fail if there are existing NULL values in that column.
  - Made the column `contact` on table `Supplier` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cnpj` on table `Tenant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `Tenant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `Tenant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `Tenant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `contact` on table `Tenant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cpf` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Movement" ALTER COLUMN "date" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updatedAt" DROP DEFAULT,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updatedAt" DROP DEFAULT,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Supplier" ALTER COLUMN "cnpj" SET NOT NULL,
ALTER COLUMN "cnpj" DROP DEFAULT,
ALTER COLUMN "address" SET NOT NULL,
ALTER COLUMN "address" DROP DEFAULT,
ALTER COLUMN "phone" SET NOT NULL,
ALTER COLUMN "phone" DROP DEFAULT,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "email" DROP DEFAULT,
ALTER COLUMN "contact" SET NOT NULL,
ALTER COLUMN "contact" DROP DEFAULT,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updatedAt" DROP DEFAULT,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Tenant" ALTER COLUMN "cnpj" SET NOT NULL,
ALTER COLUMN "cnpj" DROP DEFAULT,
ALTER COLUMN "address" SET NOT NULL,
ALTER COLUMN "address" DROP DEFAULT,
ALTER COLUMN "phone" SET NOT NULL,
ALTER COLUMN "phone" DROP DEFAULT,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "email" DROP DEFAULT,
ALTER COLUMN "contact" SET NOT NULL,
ALTER COLUMN "contact" DROP DEFAULT,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updatedAt" DROP DEFAULT,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "cpf" SET NOT NULL,
ALTER COLUMN "cpf" DROP DEFAULT,
ALTER COLUMN "dateOfBirth" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updatedAt" DROP DEFAULT,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_cnpj_key" ON "Supplier"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Tenant_cnpj_key" ON "Tenant"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "User_cpf_key" ON "User"("cpf");
