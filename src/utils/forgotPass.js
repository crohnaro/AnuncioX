const transporter = require('./nodemailerConfig');

const generateToken = () => {
  // Lógica para gerar um token único
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

const sendResetPasswordEmail = (email, token) => {
  const mailOptions = {
    from: 'seu_email@gmail.com',
    to: email,
    subject: 'Redefinição de Senha',
    html: `<p>Clique no link para redefinir sua senha: <a href="http://seusite.com/reset-password/${token}">Redefinir Senha</a></p>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      throw new Error('Erro ao enviar o e-mail.');
    } else {
      console.log('E-mail enviado: ' + info.response);
    }
  });
};



module.exports = { generateToken, sendResetPasswordEmail };