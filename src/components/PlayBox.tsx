import React from 'react';
import Link from 'next/link';
import {
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  CardActionArea,
} from '@mui/material';

export default function PlayBox({
  name,
  description,
  image,
  filterId,
  filterValue,
}: {
  name: string;
  description: string;
  image: string;
  filterId: string;
  filterValue: string;
}) {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      <CardActionArea
        component={Link}
        href={'/guess?filterId=' + filterId + '&filterValue=' + filterValue}
      >
        <CardMedia component="img" height="140" image={image} alt={name} />
        <CardContent>
          <Typography align="center" gutterBottom variant="h5">
            {name}
          </Typography>
          <Typography
            align="center"
            variant="body2"
            color="text.secondary"
            sx={{ flexGrow: 6, height: 60 }}
          >
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
