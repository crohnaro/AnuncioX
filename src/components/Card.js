import {
    Typography,
    Card as CardMUI,
    CardMedia,
    CardContent,
    CardActions, 
  } from "@mui/material";

const Card = ({image, title, subtitle, actions}) => {
  return (
    <CardMUI>
      <CardMedia
        sx={{ paddingTop: "56%" }}
        image={image}
        title="Titulo da imagem"
      />
      <CardContent>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Typography>{subtitle}</Typography>
      </CardContent>
      {
        actions
        ? (
            <CardActions>
                {actions}
            </CardActions>
        ) : null
      }
    </CardMUI>
  );
};

export default Card;
