/*
  Warnings:

  - Added the required column `price` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN "price" DOUBLE PRECISION DEFAULT 0.0 NOT NULL,
ALTER COLUMN "description" SET NOT NULL;

-- Removendo o valor padrão após a criação da coluna
ALTER TABLE "Product" ALTER COLUMN "price" DROP DEFAULT;