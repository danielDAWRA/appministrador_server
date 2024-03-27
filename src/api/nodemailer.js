import nodemailer from 'nodemailer';

const { EMAIL } = process.env;
const { PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  post: 465,
  secure: true,
  auth: {
    user: EMAIL,
    pass: PASSWORD,
  },
});

export default transporter;
