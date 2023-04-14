import { useState } from "react";

import { useTheme } from "@mui/material/styles";

import { DeleteForever } from "@mui/icons-material";

import { useDropzone } from "react-dropzone";

import {
  Box,
  Button,
  Container,
  IconButton,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import TemplateDefault from "../../src/templates/Default";

const Publish = () => {
  const theme = useTheme();

  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*" : []
    },
    onDrop: (acceptedFile) => {
      const newFiles = acceptedFile.map((file) => {
        return Object.assign(file, {
          preview: URL.createObjectURL(file),
        });
      });

      setFiles([...files, ...newFiles]);
    },
  });

  const handleRemoveFile = (fileName) => {
    setFiles(prevFiles => prevFiles.filter(file => file.name !== fileName));
  }
  

  const backgroundColor = theme.palette.background.white;

  const FileItem = ({ file, index }) => {
    const [isHovering, setIsHovering] = useState(false);
   // Adicione o estado local isHovering
    return (
      <Box
        key={file.name}
        sx={{
          width: 200,
          height: 150,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          position: "relative",
          margin: "0 15px 15px 0",
        }}
        style={{
          backgroundImage: `url(${file.preview})`,
        }}
        onMouseOver={() => setIsHovering(true)} // Use setIsHovering para atualizar o estado local
        onMouseOut={() => setIsHovering(false)} // Use setIsHovering para atualizar o estado local
      >
        {index === 0 ? (
          <Box
            sx={{
              position: "absolute",
              backgroundColor: "blue",
              padding: "6px 10px",
              bottom: 0,
            }}
          >
            <Typography variant="body2" color="secondary">
              Principal
            </Typography>
          </Box>
        ) : null}
        {isHovering && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              width: "100%",
              height: "100%",
            }}
          >
            <IconButton color="secondary" onClick={() => handleRemoveFile(file.name)}>
              <DeleteForever fontSize="large" />
            </IconButton>
          </Box>
        )}
      </Box>
    );
  };
  return (
    <TemplateDefault>
      <Container maxWidth="sm" sx={{ marginTop: "100px" }}>
        <Typography component="h1" variant="h2" align="center" color="primary">
          Publicar Anúncio
        </Typography>
        <Typography component="h1" variant="h5" align="center" color="primary">
          Quanto mais detalhado, melhor!
        </Typography>
      </Container>

      <Container maxWidth="md" style={{ marginBottom: theme.spacing(3) }}>
        <Box
          style={{
            backgroundColor: backgroundColor,
            padding: theme.spacing(3),
          }}
        >
          <Typography component="h6" variant="h6" color="primary">
            Titulo do Anúncio
          </Typography>
          <TextField
            label="ex.: Bicicleta Aro 18 com Garantia"
            size="small"
            fullWidth
          />
          <br />
          <br />
          <Typography component="h6" variant="h6" color="primary">
            Categoria
          </Typography>
          <Select
            native
            value=""
            fullWidth
            onChange={() => {}}
            inputProps={{
              name: "age",
            }}
          >
            <option value="">Selecione</option>
            <option value={1}>Bebê e Criança</option>
            <option value={2}>Agricultura</option>
            <option value={3}>Moda</option>
            <option value={3}>Carros, Motos e Barcos</option>
            <option value={3}>Serviços</option>
            <option value={3}>Lazer</option>
            <option value={3}>Animais</option>
            <option value={3}>Móveis, Casa e Jardim</option>
            <option value={3}>Imóveis</option>
            <option value={3}>Equipamentos e Ferramentas</option>
            <option value={3}>Celulares e Tablets</option>
            <option value={3}>Esporte</option>
            <option value={3}>Tecnologia</option>
            <option value={3}>Emprego</option>
            <option value={3}>Outros</option>
          </Select>
        </Box>
      </Container>

      <Container maxWidth="md" style={{ marginBottom: theme.spacing(3) }}>
        <Box
          style={{
            backgroundColor: backgroundColor,
            padding: theme.spacing(3),
          }}
        >
          <Typography component="h6" variant="h6" color="primary">
            Imagens
          </Typography>
          <Typography component="div" variant="body2" color="primary">
            A primeira imagem é a foto principal do seu anúncio.
          </Typography>
          <Box sx={{ display: "flex", marginTop: "15px", flexWrap: "wrap" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                padding: "10px",
                margin: "0 15px 15px 0",
                width: "200px",
                height: "150px",
                backgroundColor: theme.palette.background.default,
                border: "2px dashed black",
                cursor: "pointer",
              }}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <Typography variant="body2" color="primary">
                Clique para adicionar ou arraste a imagem para aqui.
              </Typography>
            </Box>
            {files.map((file, index) => (
              <FileItem key={file.id} file={file} index={index} /> // Renderize o componente FileItem para cada item em `files`
            ))}
          </Box>
        </Box>
      </Container>

      <Container maxWidth="md" style={{ marginBottom: theme.spacing(3) }}>
        <Box
          style={{
            backgroundColor: backgroundColor,
            padding: theme.spacing(3),
          }}
        >
          <Typography component="h6" variant="h6" color="primary">
            Descrição
          </Typography>
          <Typography component="div" variant="body2" color="primary">
            Escreva os detalhes do que está vendendo.
          </Typography>
          <TextField multiline rows={6} variant="outlined" fullWidth />
        </Box>
      </Container>

      <Container maxWidth="md" style={{ marginBottom: theme.spacing(3) }}>
        <Box
          style={{
            backgroundColor: backgroundColor,
            padding: theme.spacing(3),
          }}
        >
          <Typography component="h6" variant="h6" color="primary" gutterBottom>
            Dados de Contato
          </Typography>
          <TextField label="Nome" size="small" variant="outlined" fullWidth />
          <br />
          <br />
          <TextField label="E-mail" size="small" variant="outlined" fullWidth />
          <br />
          <br />
          <TextField
            label="Telefone"
            size="small"
            variant="outlined"
            fullWidth
          />
          <br />
          <br />
        </Box>
      </Container>

      <Container maxWidth="md" style={{ marginBottom: theme.spacing(3) }}>
        <Box textAlign="right">
          <Button variant="contained" color="primary">
            Publicar Anúncio
          </Button>
        </Box>
      </Container>
    </TemplateDefault>
  );
};

export default Publish;
