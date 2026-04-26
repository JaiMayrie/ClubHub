// Sends email notifications to club admins via Gmail + Nodemailer.
 
const nodemailer = require("nodemailer");
 
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});
 
/**
 * Sends a join request notification email to the club admin.
 *
 * @param {object} opts
 * @param {string} opts.adminEmail    - Admin's email address
 * @param {string} opts.adminName     - Admin's display name
 * @param {string} opts.clubName      - Name of the club
 * @param {string} opts.studentName   - Name of the student requesting
 * @param {string} opts.studentEmail  - Student's email
 * @param {string} opts.message       - Optional message from student
 */
async function sendJoinRequestEmail({
  adminEmail,
  adminName,
  clubName,
  studentName,
  studentEmail,
  message,
}) {
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
  const dashboardUrl = `${frontendUrl}/dashboard`;
 
  const messageBlock = message
    ? `<div style="background:#f9f9f9;border-left:4px solid #CFB991;padding:12px 16px;margin:16px 0;border-radius:4px;">
         <p style="margin:0;font-style:italic;color:#555;">"${message}"</p>
       </div>`
    : `<p style="color:#999;font-style:italic;margin:8px 0;">No message provided.</p>`;
 
  const html = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
  <div style="max-width:600px;margin:32px auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
 
    <!-- Header -->
    <div style="background:#000;padding:24px 32px;">
      <h1 style="margin:0;color:#CFB991;font-size:22px;">ClubHub</h1>
      <p style="margin:4px 0 0;color:#aaa;font-size:13px;">Purdue University Fort Wayne</p>
    </div>
 
    <!-- Body -->
    <div style="padding:32px;">
      <p style="color:#333;font-size:16px;margin:0 0 8px;">Hi <strong>${adminName}</strong>,</p>
      <p style="color:#555;font-size:15px;line-height:1.6;margin:0 0 24px;">
        A student has requested to join <strong>${clubName}</strong> on ClubHub.
      </p>
 
      <!-- Student card -->
      <div style="background:#f9f9f9;border:1px solid #e0e0e0;border-radius:8px;padding:20px;margin-bottom:24px;">
        <p style="margin:0 0 4px;font-size:13px;color:#888;text-transform:uppercase;letter-spacing:0.5px;">Student</p>
        <p style="margin:0 0 4px;font-size:16px;font-weight:bold;color:#222;">${studentName}</p>
        <p style="margin:0;font-size:14px;color:#555;">${studentEmail}</p>
      </div>
 
      <!-- Student message -->
      <p style="margin:0 0 4px;font-size:13px;color:#888;text-transform:uppercase;letter-spacing:0.5px;">Their Message</p>
      ${messageBlock}
 
      <!-- Dashboard button -->
      <div style="text-align:center;margin:28px 0 8px;">
        <a href="${dashboardUrl}"
           style="display:inline-block;background:#CFB991;color:#000;padding:14px 36px;border-radius:6px;font-weight:bold;font-size:15px;text-decoration:none;">
          Go to Dashboard to Approve or Reject →
        </a>
      </div>
 
      <p style="font-size:12px;color:#bbb;text-align:center;margin-top:24px;border-top:1px solid #eee;padding-top:16px;">
        You received this because you are a club admin on ClubHub PFW.
      </p>
    </div>
  </div>
</body>
</html>`;
 
  const text = `
Hi ${adminName},
 
${studentName} (${studentEmail}) has requested to join ${clubName}.
${message ? `\nTheir message: "${message}"` : ""}
 
Visit your dashboard to approve or reject:
${dashboardUrl}
 
— ClubHub, Purdue Fort Wayne
`.trim();
 
  await transporter.sendMail({
    from: `"ClubHub PFW" <${process.env.EMAIL_FROM}>`,
    to: adminEmail,
    subject: `New join request for ${clubName} — ${studentName}`,
    text,
    html,
  });
 
  console.log(`📧 Email sent to ${adminEmail} for club "${clubName}"`);
}
 
module.exports = { sendJoinRequestEmail };
