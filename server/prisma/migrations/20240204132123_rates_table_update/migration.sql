/*
  Warnings:

  - Added the required column `record` to the `Rates` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Rates" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "record" JSONB NOT NULL;
