import { json } from '@sveltejs/kit';
import { RESEND_API_KEY } from '$env/static/private';
import { Resend } from 'resend';

// replyTo is set to the sender's email so replies go directly to them
const resend = new Resend(RESEND_API_KEY);

const sanitize = (value: string) => value.replace(/[<>]/g, '').trim();

const emailTemplate = (name: string, email: string, message: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Message — Robertfolio</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:'Geist',system-ui,-apple-system,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

          <!-- Header -->
          <tr>
            <td style="padding-bottom:32px;">
              <p style="margin:0;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:#71717a;">
                robertfolio.pxxl.app
              </p>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background:#161616;border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:36px 32px;">

              <!-- Title -->
              <p style="margin:0 0 24px;font-size:22px;font-weight:700;color:#fafafa;letter-spacing:-0.04em;">
                New message from your portfolio
              </p>

              <!-- Sender info -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr>
                  <td style="padding:14px 16px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;">
                    <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:0.18em;color:#71717a;">From</p>
                    <p style="margin:0;font-size:15px;font-weight:500;color:#fafafa;">${name}</p>
                    <p style="margin:2px 0 0;font-size:13px;color:#a1a1aa;">${email}</p>
                  </td>
                </tr>
              </table>

              <!-- Message -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td style="padding:16px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;">
                    <p style="margin:0 0 8px;font-size:11px;text-transform:uppercase;letter-spacing:0.18em;color:#71717a;">Message</p>
                    <p style="margin:0;font-size:14px;line-height:1.75;color:#d4d4d8;white-space:pre-wrap;">${message}</p>
                  </td>
                </tr>
              </table>

              <!-- Reply CTA -->
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:#fafafa;border-radius:12px;">
                    <a href="mailto:${email}" style="display:inline-block;padding:12px 24px;font-size:13px;font-weight:600;color:#0a0a0a;text-decoration:none;">
                      Reply to ${name} →
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top:24px;">
              <p style="margin:0;font-size:12px;color:#52525b;line-height:1.6;">
                This message was sent via the contact form on your portfolio.<br />
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

export async function POST({ request }) {
  try {
    const body = await request.json();

    const name = sanitize(String(body.fullName ?? ''));
    const email = sanitize(String(body.email ?? ''));
    const message = sanitize(String(body.message ?? ''));

    if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10) {
      return json({ error: 'Invalid fields.' }, { status: 400 });
    }

    const { error } = await resend.emails.send({
      from: 'Robertfolio <onboarding@resend.dev>',
      to: 'devrobert.codes@gmail.com',
      replyTo: email,
      subject: `New message from ${name}`,
      html: emailTemplate(name, email, message)
    });

    if (error) {
      return json({ error: 'Failed to send.' }, { status: 500 });
    }

    return json({ success: true });
  } catch {
    return json({ error: 'Server error.' }, { status: 500 });
  }
}
