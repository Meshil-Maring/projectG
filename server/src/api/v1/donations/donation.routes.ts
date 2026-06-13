import { Router, type Request, type Response } from 'express';
import { prisma } from '../../../config/database.js';
import { asyncHandler } from '../../../common/utils/asyncHandler.js';
import { ok } from '../../../common/utils/apiResponse.js';
import { validate } from '../../../middlewares/validate.middleware.js';
import { donationLimiter } from '../../../middlewares/rateLimiter.middleware.js';
import { sendDonationReceiptEmail } from '../../../common/services/email.service.js';
import { donationSchema } from './donation.validation.js';

export const donationRoutes = Router();

donationRoutes.use(donationLimiter);

const CAUSE_LABELS: Record<string, string> = {
  general: 'Where Most Needed',
  lac: 'Legal Aid Club',
  whg: 'Work for Humanity Group',
  fseds: 'Foundation for Socio-Economic Development Society',
  hrds: 'Human Resources Developmental Society',
  cwg: 'Competitive World Group',
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

donationRoutes.post(
  '/',
  validate({ body: donationSchema }),
  asyncHandler(async (req: Request, res: Response) => {
    const { name, email, phone, section, amount, message } = req.body as typeof donationSchema._type;

    const donation = await prisma.donation.create({
      data: { name, email, phone, section, amount, message },
    });

    const causeLabel = CAUSE_LABELS[section] ?? section;
    const formattedDate = donation.createdAt.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const formattedAmount = `Rs. ${donation.amount.toLocaleString('en-IN')}`;

    const html = `
      <h2>Thank you for your donation, ${escapeHtml(name)}!</h2>
      <p>Here is your donation receipt:</p>
      <table style="border-collapse: collapse;">
        <tr><td style="padding:4px 12px 4px 0;"><strong>Receipt No.</strong></td><td style="padding:4px 0;">${donation.id}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;"><strong>Name</strong></td><td style="padding:4px 0;">${escapeHtml(name)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;"><strong>Cause</strong></td><td style="padding:4px 0;">${escapeHtml(causeLabel)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;"><strong>Amount</strong></td><td style="padding:4px 0;">${formattedAmount}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;"><strong>Date</strong></td><td style="padding:4px 0;">${formattedDate}</td></tr>
      </table>
      <p>We appreciate your generosity and support.</p>
    `;

    await sendDonationReceiptEmail({
      to: email,
      subject: 'Your Donation Receipt - ProjectG Foundation',
      html,
    });

    ok(res, { id: donation.id, createdAt: donation.createdAt }, 201);
  }),
);
