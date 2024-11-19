import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const from = {
  email: 'watershed@spindraad.nl',
  name: 'Stichting Watershed',
};

export type SendMailArguments = {
  subject: string;
  html: string;
};

export async function sendMail({ subject, html }: SendMailArguments) {
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
