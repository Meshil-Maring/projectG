-- CreateTable: lac_groups
CREATE TABLE "lac_groups" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "keyPrefix" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "lac_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable: lac_images
CREATE TABLE "lac_images" (
    "id" TEXT NOT NULL,
    "groupId" INTEGER NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "lac_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable: hrds_groups
CREATE TABLE "hrds_groups" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "keyPrefix" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "hrds_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable: hrds_images
CREATE TABLE "hrds_images" (
    "id" TEXT NOT NULL,
    "groupId" INTEGER NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "hrds_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable: cwg_groups
CREATE TABLE "cwg_groups" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "keyPrefix" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "cwg_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable: cwg_images
CREATE TABLE "cwg_images" (
    "id" TEXT NOT NULL,
    "groupId" INTEGER NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "cwg_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable: fseds_groups
CREATE TABLE "fseds_groups" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "keyPrefix" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "fseds_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable: fseds_images
CREATE TABLE "fseds_images" (
    "id" TEXT NOT NULL,
    "groupId" INTEGER NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "fseds_images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex (unique keys)
CREATE UNIQUE INDEX "lac_images_key_key" ON "lac_images"("key");
CREATE INDEX "lac_images_groupId_idx" ON "lac_images"("groupId");
CREATE UNIQUE INDEX "hrds_images_key_key" ON "hrds_images"("key");
CREATE INDEX "hrds_images_groupId_idx" ON "hrds_images"("groupId");
CREATE UNIQUE INDEX "cwg_images_key_key" ON "cwg_images"("key");
CREATE INDEX "cwg_images_groupId_idx" ON "cwg_images"("groupId");
CREATE UNIQUE INDEX "fseds_images_key_key" ON "fseds_images"("key");
CREATE INDEX "fseds_images_groupId_idx" ON "fseds_images"("groupId");

-- AddForeignKey
ALTER TABLE "lac_images" ADD CONSTRAINT "lac_images_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "lac_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "hrds_images" ADD CONSTRAINT "hrds_images_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "hrds_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "cwg_images" ADD CONSTRAINT "cwg_images_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "cwg_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "fseds_images" ADD CONSTRAINT "fseds_images_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "fseds_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
