-- CreateTable
CREATE TABLE "raw_photos" (
    "id" SERIAL NOT NULL,
    "section" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "caption" TEXT NOT NULL DEFAULT '',
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "raw_photos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "raw_photos_section_idx" ON "raw_photos"("section");

-- CreateTable
CREATE TABLE "whg_groups" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "driveFolderId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "whg_groups_pkey" PRIMARY KEY ("id")
);
