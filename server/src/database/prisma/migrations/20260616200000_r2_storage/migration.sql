-- Drop old whg_groups table and recreate with new column name (driveFolderId → keyPrefix)
-- Table is empty so no data migration needed.
DROP TABLE IF EXISTS "whg_groups";

CREATE TABLE "whg_groups" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "keyPrefix" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "whg_groups_pkey" PRIMARY KEY ("id")
);

-- New table: stores image metadata (key, name, description) for WHG gallery images
CREATE TABLE "whg_images" (
    "id" TEXT NOT NULL,
    "groupId" INTEGER NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "whg_images_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "whg_images_key_key" ON "whg_images"("key");
CREATE INDEX "whg_images_groupId_idx" ON "whg_images"("groupId");

ALTER TABLE "whg_images" ADD CONSTRAINT "whg_images_groupId_fkey"
    FOREIGN KEY ("groupId") REFERENCES "whg_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
