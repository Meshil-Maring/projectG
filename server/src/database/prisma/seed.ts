import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL ?? 'admin@projectg.org';
  const password = process.env.SEED_ADMIN_PASSWORD ?? 'ChangeMe123!';

  const admin = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      name: 'Administrator',
      password: await bcrypt.hash(password, 12),
      role: 'ADMIN',
    },
  });

  console.log(`Seeded admin user: ${admin.email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
