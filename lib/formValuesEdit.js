import * as yup from 'yup';

const validationSchema = yup.object().shape({
  title: yup.string().min(5).max(100).required(),
  category: yup.string().required(),
  description: yup.string().min(20).max(1500).required(),
  price: yup.string().required(),
  name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().required(),
  files: yup.array().min(1, 'Envie pelo menos 1 foto').required(),
})
export {
  validationSchema
}