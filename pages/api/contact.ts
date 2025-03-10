import nodemailer from 'nodemailer';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: any, res: any) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_ACC,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: 'rajfta@gmail.com',
      to: 'rajfta@gmail.com',
      subject: `Email from my portfolio website from: ${email} | name: ${name}`,
      html: `<p>Message from my portfolio site</p><br>
      <p>${message}</p><br>

      `,
    });

    // eslint-disable-next-line no-console
    console.log('Message Sent');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }

  res.status(200).json(req.body);
};
