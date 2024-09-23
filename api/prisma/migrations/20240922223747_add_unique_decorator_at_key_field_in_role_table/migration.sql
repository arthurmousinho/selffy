/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `Role` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Role_key_key" ON "Role"("key");
