import { NextApiRequest, NextApiResponse } from 'next';

// sgMail.setApiKey(process.env.EMAIL_API_KEY);

export default async function sendEmail(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, subject, message, name } = req.body;
  const msg = {
    to: '<your-email@example.com',
    from: email,
    subject,
    name,
    text: message,
  };

  try {
    // await sgMail.send(msg);
    res.json({ message: `Email has been sent` , msg});
  } catch (error) {
    res.status(500).json({ error: 'Error sending email' });
  }
}
