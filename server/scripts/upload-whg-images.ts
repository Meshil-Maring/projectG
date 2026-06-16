import 'dotenv/config';
import { google } from 'googleapis';
import { createReadStream, readdirSync } from 'fs';
import { join, extname } from 'path';

const WHG_FOLDER_ID = '1mWYWzaDJ5wHx0go2fX9WPV3qBaEevcky';
const IMAGE_DIR = join(process.cwd(), 'image');

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/drive'],
});

const drive = google.drive({ version: 'v3', auth });

async function uploadFile(filePath: string, name: string): Promise<string> {
  const res = await drive.files.create({
    requestBody: {
      name,
      parents: [WHG_FOLDER_ID],
    },
    media: {
      mimeType: 'image/jpeg',
      body: createReadStream(filePath),
    },
    fields: 'id',
  });

  const fileId = res.data.id!;

  await drive.permissions.create({
    fileId,
    requestBody: { role: 'reader', type: 'anyone' },
  });

  return `https://drive.google.com/uc?export=view&id=${fileId}`;
}

async function main() {
  const files = readdirSync(IMAGE_DIR)
    .filter((f) => extname(f).toLowerCase() === '.jpeg' || extname(f).toLowerCase() === '.jpg')
    .sort();

  console.log(`Found ${files.length} images. Starting upload...\n`);

  for (let i = 0; i < files.length; i++) {
    const newName = `whg_${String(i + 1).padStart(3, '0')}.jpeg`;
    const filePath = join(IMAGE_DIR, files[i]);

    process.stdout.write(`[${i + 1}/${files.length}] ${files[i]} → ${newName} ... `);

    const url = await uploadFile(filePath, newName);
    console.log(`✓  ${url}`);
  }

  console.log('\nAll uploads complete.');
}

main().catch((err) => {
  console.error('Upload failed:', err.message);
  process.exit(1);
});
