import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const from = {
  email: 'watershed@spindraad.nl',
  name: 'Stichting Watershed',
};

export type SendMailArguments = {
  email: string;
  subject: string;
  html: string;
};

export async function sendMail({ email, subject, html }: SendMailArguments) {
  console.log('Sending mail to', email);
  try {
    const res = await sgMail.send({
      to: 'lody@spindraad.nl',
      from,
      subject,
      html,
    });
    console.log('Mail sent to my mailbox');
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function sendPasswordResetMail(email: string, token: string) {
  const subject = 'Reset your password';
  const html = `
    <p>Click the link below to reset your password</p>
    <a href="${process.env.HOSTNAME}/wachtwoord-reset?token=${token}&email=${email}">Reset password</a>
  `;
  return sendMail({ email, subject, html });
}
