import * as yup from "yup"

const initialValues = {
    title: '',
    category: '',
    description: '',
    price: '',
    email: '',
    name: '',
    phone: '',
    files: [],
}

const validationSchema = yup.object().shape({
    title: yup.string()
      .min(6, 'Escreva um titulo maior.')
      .max(100, 'Titulo muito grande.')
      .required('Campo obrigatório.'),
    
    category: yup.string()
      .required('Campo obrigatório.'),
    
    description: yup.string()
      .min(50, 'Escreva uma descrição de no mínimo 50 caracteres.')
      .required('Campo obrigatório.'),
    
    price: yup.number()
      .typeError('Você precisa digitar um número.')
      .required('Campo obrigatório.'),

    email: yup.string()
      .email('Digite um e-mail válido.')
      .required('Campo obrigatório.'),
    
    name: yup.string()
      .required('Campo obrigatório.'),
      
    phone: yup.number()
      .required('Campo obrigatório.'),

    files: yup.array()
      .min(1, 'Envie pelo menos uma foto')
      .required('Campo obrigatorio')
  })

  export {
    initialValues,
    validationSchema,
  }

