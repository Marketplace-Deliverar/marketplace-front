import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';


export default function MyCard({ imageSrc, title, description, label, url }) {

  const titleStyle = {
    fontSize: '18px',
    color: '#1976d2',
    fontFamily: 'Montserrat, sans-serif',
  };

  const handleClick = () => {
    // window.location.href = 'http://hola.localhost:3000';
    window.location.href = 'https://' + url;
  };

  const cardMediaContainerStyle = {
    width: 140, // Ancho deseado
    height: 140, // Altura deseada
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  };

  const cardMediaStyle = {
    width: '100%', // Ancho deseado
    height: '100%', // Altura deseada
    objectFit: 'cover',
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          style={cardMediaStyle}
          image={imageSrc}
          alt={label}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" style={titleStyle}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button onClick={handleClick} size="small" style={{ fontWeight: 'bold', fontFamily: 'Montserrat, sans-serif' }}>Ver Más</Button>
      </CardActions>
    </Card>
  );
}