const { PrismaClient } = require('./dist/generated/prisma');
const prisma = new PrismaClient();
async function main() {
  const photos = await prisma.rawPhoto.findMany({ orderBy: { uploadedAt: 'asc' } });
  const gallery = await prisma.galleryPhoto.findMany({ orderBy: { order: 'asc' } });
  console.log('raw_photos:', JSON.stringify(photos.slice(0,10), null, 2));
  console.log('gallery_photos:', JSON.stringify(gallery.slice(0,10), null, 2));
  await prisma.$disconnect();
}
main().catch(console.error);
