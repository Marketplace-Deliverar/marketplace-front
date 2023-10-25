import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const cardsData = [
  { id: 1, label: "descripción", title: "producto 1", subheader: "precio", image: "https://thumbs.dreamstime.com/b/etiqueta-engomada-del-ejemplo-121022914.jpg" },
  { id: 2, label: "descripción", title: "producto 2", subheader: "precio", image: "https://thumbs.dreamstime.com/b/etiqueta-engomada-del-ejemplo-121022914.jpg" },
  { id: 3, label: "descripción", title: "producto 3", subheader: "precio", image: "https://thumbs.dreamstime.com/b/etiqueta-engomada-del-ejemplo-121022914.jpg" },
  { id: 4, label: "descripción", title: "producto 4", subheader: "precio", image: "https://thumbs.dreamstime.com/b/etiqueta-engomada-del-ejemplo-121022914.jpg" },
  { id: 5, label: "descripción", title: "producto 5", subheader: "precio", image: "https://thumbs.dreamstime.com/b/etiqueta-engomada-del-ejemplo-121022914.jpg" },
  { id: 6, label: "descripción", title: "producto 6", subheader: "precio", image: "https://thumbs.dreamstime.com/b/etiqueta-engomada-del-ejemplo-121022914.jpg" },
  { id: 7, label: "descripción", title: "producto 7", subheader: "precio", image: "https://thumbs.dreamstime.com/b/etiqueta-engomada-del-ejemplo-121022914.jpg" },
  { id: 8, label: "descripción", title: "producto 8", subheader: "precio", image: "https://thumbs.dreamstime.com/b/etiqueta-engomada-del-ejemplo-121022914.jpg" },
  { id: 9, label: "descripción", title: "producto 9", subheader: "precio", image: "https://thumbs.dreamstime.com/b/etiqueta-engomada-del-ejemplo-121022914.jpg" },
];

export default function ProductCards() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
      {cardsData.map((card) => (
        <Card key={card.id} sx={{ width: 345, height: 400, margin: '16px' }}>
          <CardHeader
            title={card.title}
            subheader={card.subheader}
          />
          <CardMedia
            component="img"
            height="194"
            image={card.image}
            alt={card.title}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {card.label}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <ShoppingCartIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}