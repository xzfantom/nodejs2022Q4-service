-- AlterTable
ALTER TABLE "Album" ADD COLUMN     "isFav" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Artist" ADD COLUMN     "isFav" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Track" ADD COLUMN     "isFav" BOOLEAN NOT NULL DEFAULT false;
