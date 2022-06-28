import React from 'react';
import {
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  // CardActionArea,
} from '@mui/material';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function PlayBox(props) {
  const { name, description, image, campuses } = props;

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      {/* <CardActionArea component={Link} to="/guess" state={{ data: campuses }}> */}
      <CardMedia component="img" height="140" image={image} alt={name} />
      <CardContent>
        <Typography align="center" gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography
          align="center"
          variant="body2"
          color="text.secondary"
          sx={{ flexGrow: 6 }}
        >
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="outlined"
          sx={{ width: '100%' }}
          component={Link}
          to="/guess"
          state={{ data: campuses }}
        >
          Start Guessing
        </Button>
      </CardActions>
      {/* </CardActionArea> */}
    </Card>
  );
}

PlayBox.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  campuses: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default PlayBox;
