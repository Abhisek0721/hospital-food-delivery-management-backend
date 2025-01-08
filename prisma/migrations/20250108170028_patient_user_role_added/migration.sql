-- AlterEnum
ALTER TYPE "UserRole" ADD VALUE 'PATIENT';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isNewUser" BOOLEAN DEFAULT false;
