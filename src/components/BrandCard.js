import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

const cardMediaStyle = {
  width: "100%",
  height: "200px",
  objectFit: "cover",
};

const BrandCard = (props) => {
  const { imageSrc, title, description, label, url } = props;

  const handleClick = () => {
    //window.location.href = "http://hola.localhost:3000";
    window.location.href = "https://" + url;
  };

  return (
    <Card sx={{ maxWidth: 345 }} onClick={handleClick}>
      <CardActionArea>
        <CardMedia
          component="img"
          style={cardMediaStyle}
          image={imageSrc}
          alt={label}
        />
        <CardContent>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body2">{description}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" style={{ fontWeight: "bold" }}>
          Ver Más
        </Button>
      </CardActions>
    </Card>
  );
};

export default BrandCard;
