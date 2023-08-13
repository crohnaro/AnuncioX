import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'O campo "nome" é obrigatório.'],
  },
  email: {
    type: String,
    required: [true, 'O campo "e-mail" é obrigatório.'],
  },
  password: {
    type: String,
    required: function () {
      // Torna o campo obrigatório apenas quando o authMethod for "credentials"
      return this.authMethod === "credentials";
    },
  },
  authMethod: {
    type: String,
  },
  image: {
    type: String,
  }
});

export default mongoose.models.users || mongoose.model("users", schema);