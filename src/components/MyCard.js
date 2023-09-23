import * as React from 'react';
import {Card, CardContent, CardMedia, Typography, Button, CardActionArea, CardActions, IconButton} from '@mui/material';
import StarIcon  from '@mui/icons-material';

const MyCard = ({imageSrc, title, description, label}) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={imageSrc}
          alt={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="warning">
          {label}
        </Button>
        <IconButton>
          <StarIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default MyCard;
