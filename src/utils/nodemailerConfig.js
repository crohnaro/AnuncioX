import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'seu_email@gmail.com',
    pass: 'sua_senha'
  }
});

export default transporter;