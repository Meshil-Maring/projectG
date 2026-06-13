import nodemailer from 'nodemailer';
import { env } from '../../config/env.js';
import { logger } from '../../config/logger.js';

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: env.SMTP_PORT === 465,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});

interface SendMailOptions {
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendContactEmail({ subject, html, replyTo }: SendMailOptions): Promise<void> {
  try {
    await transporter.sendMail({
      from: env.EMAIL_FROM,
      to: env.CONTACT_EMAIL_TO,
      subject,
      html,
      replyTo,
    });
  } catch (err) {
    logger.error({ err }, 'Failed to send contact email');
    throw new Error('Failed to send email. Please try again later.');
  }
}

interface SendDonationReceiptOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendDonationReceiptEmail({ to, subject, html }: SendDonationReceiptOptions): Promise<void> {
  try {
    await transporter.sendMail({
      from: env.EMAIL_FROM,
      to,
      subject,
      html,
    });
  } catch (err) {
    logger.error({ err }, 'Failed to send donation receipt email');
    throw new Error('Failed to send receipt email. Please try again later.');
  }
}
