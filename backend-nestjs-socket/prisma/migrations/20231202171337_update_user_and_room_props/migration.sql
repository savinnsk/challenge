/*
  Warnings:

  - Added the required column `userId` to the `rooms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `welcomeMessage` to the `rooms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "rooms" ADD COLUMN     "userId" TEXT NOT NULL,
ADD COLUMN     "welcomeMessage" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "photoUrl" TEXT;

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
