-- CreateTable
CREATE TABLE "whg_groups" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "driveFolderId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "whg_groups_pkey" PRIMARY KEY ("id")
);
