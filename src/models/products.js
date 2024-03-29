import mongoose from "mongoose";

const filesSchema = new mongoose.Schema({
    name: String,
    url: String,
    publicId: String,
})

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'O campo "nome" é obrigatório.'],
  },
  category: {
    type: String,
    required: [true, 'O campo "e-mail" é obrigatório.'],
  },
  description: {
    type: String,
    required: [true, 'O campo "senha" é obrigatório.'],
  },
  price: {
    type: Number,
    required: [true, 'O campo "senha" é obrigatório.'],
  },

  user: {
    id: String,
    name: String,
    email: String,
    phone: String,
    image: String,
  },

  files: {
    type: [filesSchema],
    default: undefined,
  }
});

export default mongoose.models.products || mongoose.model("products", schema);
