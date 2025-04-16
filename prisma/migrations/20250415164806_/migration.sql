-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "supplementary" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "explanation" SET DEFAULT '';
