import React from 'react';
import {
    Box, Button,
    Card, CardActions,
    CardContent,
    CardMedia,
    Chip,
    Typography
} from "@material-ui/core";
import {LocationOn, Phone} from "@material-ui/icons";
import { useStyles } from './styles';
import Rating from "@material-ui/lab/Rating";

export const PlaceDetails = ({ place }: any) => {
  const classes = useStyles();
  return (
      <Card elevation={6}>
        <CardMedia
            style={{height: 350}}
            title={place.name}
            image={place.photo ? place.photo.images.large.url : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"}
        />
          <CardContent>
              <Typography variant="h5" gutterBottom>
                  {place.name}
              </Typography>
              <Box display="flex" justifyContent="space-between">
                  <Rating name="read-only" readOnly value={Number(place.rating)} />
                  <Typography gutterBottom variant="subtitle1">
                      out of {place.num_reviews} reviews
                  </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                  <Typography variant="subtitle1">
                      price
                  </Typography>
                  <Typography gutterBottom variant="subtitle1">
                      {place.price_level}
                  </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                  <Typography variant="subtitle1">
                      Ranking
                  </Typography>
                  <Typography gutterBottom variant="subtitle1">
                      {place.ranking}
                  </Typography>
              </Box>
              {
                  place?.awards?.map((award:any, idx:number) => (
                      <Box
                          display="flex"
                          justifyContent="space-between"
                          my={1}
                          alignItems="center"
                          key={idx}
                      >
                          <img src={award.images.small} alt={award.display_name} />
                          <Typography variant="subtitle2" color="textSecondary">{award.display_name}</Typography>
                      </Box>
                  ))
              }

              {
                  place?.cuisine?.map(({name}:any, idx:number) => (
                      <Chip
                          className={classes.chip}
                          label={name}
                          size="small"
                          key={idx}
                      />
                  ))
              }

              {
                  place?.address && (
                      <Typography
                          gutterBottom
                          variant="subtitle2"
                          color="textSecondary"
                          className={classes.subtitle}
                      >
                          <LocationOn /> {place.address}
                      </Typography>
                  )
              }

              {place.phone && (
                  <Typography variant="body2" color="textSecondary" className={classes.spacing}>
                      <Phone /> {place.phone}
                  </Typography>
              )}

              <CardActions>
                  <Button
                      size="small"
                      color="primary"
                      onClick={() => {
                          window.open(place.web_url, "_blank");
                      }}
                  >
                      Trip Advisor
                  </Button>
                  <Button
                      size="small"
                      color="primary"
                      onClick={() => {
                          window.open(place.website, "_blank");
                      }}
                  >
                      Website
                  </Button>
              </CardActions>
          </CardContent>
      </Card>
  )
};
