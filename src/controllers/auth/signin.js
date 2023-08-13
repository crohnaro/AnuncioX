import UsersModel from "../../models/users";
import dbConnect from "../../utils/dbConnect";
import { compare } from "../../utils/password";

const post = async (req, res) => {
  const { email, password, authMethod } = req.body;

  await dbConnect();
  const effectiveAuthMethod = authMethod || 'credentials';

  if (effectiveAuthMethod === 'credentials') {
    const user = await UsersModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ success: false, message: 'invalid' });
    }

    const passIsCorrect = await compare(password, user.password);

    if (passIsCorrect) {
      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        authMethod: user.authMethod,
      });
    }
  } else if (effectiveAuthMethod === 'google') {
    const existingGoogleUser = await UsersModel.findOne({ email, authMethod: 'google' });

    if (existingGoogleUser) {
      return res.status(200).json({
        _id: existingGoogleUser._id,
        name: existingGoogleUser.name,
        email: existingGoogleUser.email,
        authMethod: existingGoogleUser.authMethod
      });
    } else {
      // Crie um novo usuário para autenticação via Google e retorne sucesso
      const newUser = new UsersModel({
        name: existingGoogleUser.name,
        email: email,
        authMethod: 'google',
      });
      await newUser.save();

      return res.status(200).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        authMethod: newUser.authMethod,
      });
    }
  }

  return res.status(401).json({ success: false, message: 'invalid' });
};

export {
  post,
};