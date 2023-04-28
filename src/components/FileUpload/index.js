import { useDropzone } from "react-dropzone";
import { DeleteForever } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

import {
    Box,
    IconButton,
    Typography,
} from "@mui/material";

import styles from '../../../src/styles/FileUpload.module.css'

const FileUpload = ({ files, errors, touched, setFieldValue }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFile) => {
      const newFiles = acceptedFile.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      }))

      setFieldValue("files", [...files, ...newFiles]);
    },
  });
  const handleRemoveFile = (fileName) => {
    const newFileState = files.filter((file) => file.name !== fileName);
    setFieldValue("files", newFileState);
  };

  const theme = useTheme();

  return (
    <>
      <Typography
        component="h6"
        variant="h6"
        color={errors && touched ? "error" : "primary"}
      >
        Imagens
      </Typography>
      <Typography
        component="div"
        variant="body2"
        color={errors && touched ? "error" : "primary"}
      >
        A primeira imagem é a foto principal do seu anúncio.
      </Typography>

      {errors && touched ? (
        <Typography variant="body2" color="error" gutterBottom>
          {errors}
        </Typography>
      ) : null}

      <Box className={styles.thumbsContainer}>
        <Box
          sx={{ backgroundColor: theme.palette.background.default }}
          className={styles.dropzone}
          {...getRootProps()}
        >
          <input name="files" {...getInputProps()} />
          <Typography
            variant="body2"
            color={errors && touched ? "error" : "primary"}
          >
            Clique para adicionar ou arraste a imagem para aqui.
          </Typography>
        </Box>
        {files.map((file, index) => (
          <Box
            key={file.name}
            className={styles.thumb}
            style={{ backgroundImage: `url(${file.preview})` }}
          >
            {index === 0 ? (
              <Box className={styles.mainImage}>
                <Typography variant="body2" color="secondary">
                  Principal
                </Typography>
              </Box>
            ) : null}
            <Box className={styles.mask}>
              <IconButton
                color="secondary"
                onClick={() => handleRemoveFile(file.name)}
              >
                <DeleteForever fontSize="large" />
              </IconButton>
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default FileUpload;
