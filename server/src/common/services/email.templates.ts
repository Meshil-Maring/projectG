const BASE = `
  <body style="margin:0;padding:0;background:#f4f6f8;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f8;padding:32px 0;">
      <tr><td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">
          {{CONTENT}}
          <tr>
            <td style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:24px 40px;text-align:center;">
              <p style="margin:0;font-size:13px;color:#9ca3af;line-height:1.6;">
                Project Generation &mdash; Manipur<br/>
                This is an automated message. Please do not reply directly to this email.
              </p>
            </td>
          </tr>
        </table>
      </td></tr>
    </table>
  </body>
`;

function wrap(content: string): string {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>${BASE.replace('{{CONTENT}}', content)}</html>`;
}

function header(title: string, subtitle: string, accent = '#1a6b3c'): string {
  return `
    <tr>
      <td style="background:${accent};padding:36px 40px 28px;">
        <p style="margin:0 0 4px;font-size:12px;font-weight:600;letter-spacing:1.5px;color:rgba(255,255,255,0.7);text-transform:uppercase;">Project Generation</p>
        <h1 style="margin:0;font-size:24px;font-weight:700;color:#ffffff;line-height:1.3;">${title}</h1>
        <p style="margin:6px 0 0;font-size:14px;color:rgba(255,255,255,0.8);">${subtitle}</p>
      </td>
    </tr>
  `;
}

function row(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;width:140px;vertical-align:top;">
        <span style="font-size:12px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;">${label}</span>
      </td>
      <td style="padding:10px 0 10px 16px;border-bottom:1px solid #f3f4f6;vertical-align:top;">
        <span style="font-size:15px;color:#111827;">${value}</span>
      </td>
    </tr>
  `;
}

function messageBox(text: string): string {
  return `
    <tr>
      <td colspan="2" style="padding:16px 0 0;">
        <p style="margin:0 0 8px;font-size:12px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;">Message</p>
        <div style="background:#f9fafb;border-left:3px solid #1a6b3c;border-radius:4px;padding:14px 16px;">
          <p style="margin:0;font-size:15px;color:#374151;line-height:1.7;">${text}</p>
        </div>
      </td>
    </tr>
  `;
}

export function contactMessageTemplate(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): string {
  const content = `
    ${header('New Contact Message', `From ${data.name}`)}
    <tr>
      <td style="padding:32px 40px 36px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          ${row('From', data.name)}
          ${row('Email', `<a href="mailto:${data.email}" style="color:#1a6b3c;text-decoration:none;">${data.email}</a>`)}
          ${row('Subject', data.subject)}
          ${messageBox(data.message)}
        </table>
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;">
          <tr>
            <td>
              <a href="mailto:${data.email}" style="display:inline-block;background:#1a6b3c;color:#ffffff;font-size:14px;font-weight:600;padding:12px 24px;border-radius:8px;text-decoration:none;">
                Reply to ${data.name}
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `;
  return wrap(content);
}

export function volunteerTemplate(data: {
  name: string;
  email: string;
  phone?: string;
  areas: string[];
  message?: string;
}): string {
  const content = `
    ${header('New Volunteer Sign-Up', `${data.name} wants to volunteer`, '#1a4b6b')}
    <tr>
      <td style="padding:32px 40px 36px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          ${row('Name', data.name)}
          ${row('Email', `<a href="mailto:${data.email}" style="color:#1a4b6b;text-decoration:none;">${data.email}</a>`)}
          ${data.phone ? row('Phone', data.phone) : ''}
          ${row('Areas', data.areas.map(a => `<span style="display:inline-block;background:#e0f2fe;color:#0369a1;font-size:12px;font-weight:600;padding:3px 10px;border-radius:20px;margin:2px 4px 2px 0;">${a}</span>`).join(''))}
          ${data.message ? messageBox(data.message.replace(/\n/g, '<br/>')) : ''}
        </table>
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;">
          <tr>
            <td>
              <a href="mailto:${data.email}" style="display:inline-block;background:#1a4b6b;color:#ffffff;font-size:14px;font-weight:600;padding:12px 24px;border-radius:8px;text-decoration:none;">
                Reply to ${data.name}
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `;
  return wrap(content);
}

export function passwordResetTemplate(data: { name: string; resetUrl: string }): string {
  const content = `
    ${header('Reset Your Password', 'You requested a password reset')}
    <tr>
      <td style="padding:32px 40px 36px;">
        <p style="margin:0 0 16px;font-size:15px;color:#374151;line-height:1.7;">Hi ${data.name},</p>
        <p style="margin:0 0 24px;font-size:15px;color:#374151;line-height:1.7;">
          We received a request to reset your admin account password. Click the button below to set a new password. This link expires in <strong>1 hour</strong>.
        </p>
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
          <tr>
            <td align="center">
              <a href="${data.resetUrl}" style="display:inline-block;background:#1a3270;color:#ffffff;font-size:14px;font-weight:600;padding:14px 32px;border-radius:8px;text-decoration:none;">
                Reset Password
              </a>
            </td>
          </tr>
        </table>
        <p style="margin:0 0 8px;font-size:13px;color:#6b7280;line-height:1.6;">
          If the button doesn't work, copy and paste this link into your browser:
        </p>
        <p style="margin:0 0 24px;font-size:12px;color:#9ca3af;word-break:break-all;">${data.resetUrl}</p>
        <p style="margin:0;font-size:13px;color:#9ca3af;line-height:1.6;">
          If you didn't request a password reset, you can safely ignore this email.
        </p>
      </td>
    </tr>
  `;
  return wrap(content);
}

export function donationReceiptTemplate(data: {
  name: string;
  receiptId: string;
  cause: string;
  amount: string;
  date: string;
}): string {
  const content = `
    ${header('Donation Received', `Thank you for your generosity, ${data.name}!`)}
    <tr>
      <td style="padding:32px 40px 0;">
        <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:20px 24px;text-align:center;">
          <p style="margin:0 0 4px;font-size:13px;color:#16a34a;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Amount Donated</p>
          <p style="margin:0;font-size:36px;font-weight:700;color:#15803d;">${data.amount}</p>
        </div>
      </td>
    </tr>
    <tr>
      <td style="padding:24px 40px 36px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          ${row('Receipt No.', `<span style="font-family:monospace;font-size:13px;color:#6b7280;">#${data.receiptId}</span>`)}
          ${row('Donor', data.name)}
          ${row('Cause', data.cause)}
          ${row('Date', data.date)}
        </table>
        <div style="margin-top:28px;background:#f9fafb;border-radius:8px;padding:20px 24px;text-align:center;">
          <p style="margin:0;font-size:14px;color:#6b7280;line-height:1.6;">
            Your contribution makes a real difference.<br/>
            <strong style="color:#111827;">We deeply appreciate your support.</strong>
          </p>
        </div>
      </td>
    </tr>
  `;
  return wrap(content);
}
