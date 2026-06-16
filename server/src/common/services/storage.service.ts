import { google } from 'googleapis';
import { Readable } from 'stream';
import { env } from '../../config/env.js';
import { logger } from '../../config/logger.js';

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/drive'],
});

const drive = google.drive({ version: 'v3', auth });

export async function uploadBuffer(path: string, buffer: Buffer, contentType: string): Promise<string> {
  const stream = Readable.from(buffer);

  const res = await drive.files.create({
    requestBody: {
      name: path,
      parents: [env.GOOGLE_DRIVE_FOLDER_ID],
    },
    media: {
      mimeType: contentType,
      body: stream,
    },
    fields: 'id',
  });

  const fileId = res.data.id!;

  await drive.permissions.create({
    fileId,
    requestBody: {
      role: 'reader',
      type: 'anyone',
    },
  });

  return `https://drive.google.com/uc?export=view&id=${fileId}`;
}

export async function deleteByPath(fileId: string): Promise<void> {
  try {
    await drive.files.delete({ fileId });
  } catch (err) {
    logger.error({ err, fileId }, 'Failed to delete file from Google Drive');
  }
}

export function getPathFromPublicUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (u.hostname === 'drive.google.com') {
      return u.searchParams.get('id');
    }
  } catch {
    // invalid URL
  }
  return null;
}

// No-op — no bucket concept in Google Drive
export async function ensureBucket(): Promise<void> {}
