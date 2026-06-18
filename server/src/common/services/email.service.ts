import { Resend } from 'resend';
import { env } from '../../config/env.js';
import { logger } from '../../config/logger.js';

const resend = new Resend(env.RESEND_API_KEY);

interface SendMailOptions {
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendContactEmail({ subject, html, replyTo }: SendMailOptions): Promise<void> {
  const { error } = await resend.emails.send({
    from: env.EMAIL_FROM,
    to: env.CONTACT_EMAIL_TO,
    subject,
    html,
    replyTo,
  });

  if (error) {
    logger.error({ error }, 'Failed to send contact email');
    throw new Error('Failed to send email. Please try again later.');
  }
}

interface SendDonationReceiptOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendDonationReceiptEmail({ to, subject, html }: SendDonationReceiptOptions): Promise<void> {
  const { error } = await resend.emails.send({
    from: env.EMAIL_FROM,
    to,
    subject,
    html,
  });

  if (error) {
    logger.error({ error }, 'Failed to send donation receipt email');
    throw new Error('Failed to send receipt email. Please try again later.');
  }
}
