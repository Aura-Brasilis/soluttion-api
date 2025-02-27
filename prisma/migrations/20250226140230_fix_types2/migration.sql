/*
  Warnings:

  - The primary key for the `inquilino_usina` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "cliente_usina" DROP CONSTRAINT "cliente_usina_id_usina_fkey";

-- DropForeignKey
ALTER TABLE "controle_faturamento" DROP CONSTRAINT "controle_faturamento_id_usina_fkey";

-- DropForeignKey
ALTER TABLE "inquilino_usina" DROP CONSTRAINT "inquilino_usina_id_inquilino_fkey";

-- DropForeignKey
ALTER TABLE "inquilino_usina" DROP CONSTRAINT "inquilino_usina_id_usina_fkey";

-- AlterTable
ALTER TABLE "cliente_usina" ALTER COLUMN "id_usina" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "controle_faturamento" ALTER COLUMN "id_usina" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "inquilino_usina" DROP CONSTRAINT "inquilino_usina_pkey",
ALTER COLUMN "id_usina" SET DATA TYPE TEXT,
ALTER COLUMN "id_inquilino" SET DATA TYPE TEXT,
ADD CONSTRAINT "inquilino_usina_pkey" PRIMARY KEY ("id_usina");

-- AlterTable
ALTER TABLE "inquilinos" ALTER COLUMN "id_inquilino" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "usinas" ALTER COLUMN "id_usina" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "cliente_usina" ADD CONSTRAINT "cliente_usina_id_usina_fkey" FOREIGN KEY ("id_usina") REFERENCES "usinas"("id_usina") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "controle_faturamento" ADD CONSTRAINT "controle_faturamento_id_usina_fkey" FOREIGN KEY ("id_usina") REFERENCES "usinas"("id_usina") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inquilino_usina" ADD CONSTRAINT "inquilino_usina_id_inquilino_fkey" FOREIGN KEY ("id_inquilino") REFERENCES "inquilinos"("id_inquilino") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inquilino_usina" ADD CONSTRAINT "inquilino_usina_id_usina_fkey" FOREIGN KEY ("id_usina") REFERENCES "usinas"("id_usina") ON DELETE CASCADE ON UPDATE NO ACTION;
