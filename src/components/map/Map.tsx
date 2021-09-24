import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import { LocationOnOutlined } from '@material-ui/icons';
import Rating from '@material-ui/lab/Rating';
import { useStyles } from './styles';
import {BoundsInterfaces, Coordinates} from '../../App';
import mapStyles from '../../MapStyles';

interface Props {
  coordinates: Coordinates;
  setCoordinates: React.Dispatch<React.SetStateAction<Coordinates>>;
  setBounds: React.Dispatch<React.SetStateAction<BoundsInterfaces>>;
  setChildClicked: React.Dispatch<React.SetStateAction<null>>
  places: Array<any>
}

export const Map = ({ coordinates, setCoordinates, setBounds, places, setChildClicked }: Props) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery('(min-width:600px)');

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyBanw7MwVDrdzLFvb2WO7QSZI2fFZdqzoA' }}
        defaultCenter={coordinates}
        center={coordinates}
        options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        onChange={(e) => {
          setCoordinates({
            lat: e.center.lat,
            lng: e.center.lng,
          });
          setBounds({
              ne: e.marginBounds.ne,
              sw: e.marginBounds.sw
          })
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
          {places?.map((place, idx) => (
              <div
                  className={classes.markerContainer}
                  // @ts-ignore
                  lat={Number(place.latitude)}
                  lng={Number(place.longitude)}
                  key={idx}
              >
                  {
                      !isDesktop ? (
                          <LocationOnOutlined fontSize="large" color="primary"/>
                      ) : (
                          <Paper elevation={3} className={classes.paper}>
                            <Typography gutterBottom variant="subtitle2" >
                                {place.name}
                            </Typography>
                            <img
                                  className={classes.pointer}
                                  src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                                  alt={place.name}
                              />
                            <Rating name="read-only" readOnly size="small" value={Number(place.rating)} />
                          </Paper>
                      )
                  }
              </div>
          ))}
      </GoogleMapReact>
    </div>
  );
};
