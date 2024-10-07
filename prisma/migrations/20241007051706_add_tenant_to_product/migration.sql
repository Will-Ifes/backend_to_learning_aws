/*
  Warnings:

  - Added the required column `tenantId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- Adicionando a coluna `tenantId` com um valor padrão temporário
ALTER TABLE "Product" ADD COLUMN "tenantId" INTEGER DEFAULT 1;

-- Removendo o valor padrão e tornando a coluna `tenantId` obrigatória
ALTER TABLE "Product" ALTER COLUMN "tenantId" SET NOT NULL;
ALTER TABLE "Product" ALTER COLUMN "tenantId" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;