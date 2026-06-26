/** Branded Azerbaijani welcome email, sent once when a new user first lands. */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.foundrr.online";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function welcomeEmailHtml(name?: string | null): string {
  const greetName = name?.trim() ? `, ${escapeHtml(name.trim())}` : "";
  return `<div style="background:#faf8f5;padding:32px 0;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
    <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="max-width:480px;background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid #ece7df;">
      <tr><td style="height:6px;background:linear-gradient(90deg,#3b6cff,#7735e9,#ff3da6,#ff8a3d);"></td></tr>
      <tr><td style="padding:36px 36px 8px;">
        <div style="font-size:20px;font-weight:700;color:#1b1830;">Foundrr-a xoş gəlmisən${greetName}! 🎉</div>
        <p style="margin:16px 0 0;font-size:15px;line-height:1.6;color:#55506a;">Fikrini yaz — saytın hazır olsun. Bir cümlə kifayətdir: biznesini təsvir et, Foundrr sənə tam işlək, real sayt qursun.</p>
        <p style="margin:14px 0 0;font-size:15px;line-height:1.6;color:#55506a;">Hesabında <b style="color:#1b1830;">100 pulsuz kredit</b> var — ilk saytını elə indi qura bilərsən.</p>
      </td></tr>
      <tr><td style="padding:24px 36px 36px;">
        <table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="border-radius:12px;background:#1b1830;">
          <a href="${SITE_URL}/workspace" style="display:inline-block;padding:13px 22px;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;">İlk saytını qur →</a>
        </td></tr></table>
        <p style="margin:24px 0 0;font-size:12px;line-height:1.5;color:#9a93ab;">Foundrr · Bakı, Azərbaycan<br/>Bu məktubu Foundrr hesabı açdığın üçün aldın.</p>
      </td></tr>
    </table>
  </td></tr></table>
</div>`;
}

/** Send the welcome email via the Resend API. Returns false if not configured. */
export async function sendWelcomeEmail(to: string, name?: string | null): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || !to) return false;
  const from = process.env.WELCOME_FROM ?? "Foundrr <salam@foundrr.online>";
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to,
        subject: "Foundrr-a xoş gəlmisən 🎉",
        html: welcomeEmailHtml(name),
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
