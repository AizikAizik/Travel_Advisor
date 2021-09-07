import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import { LocationOnOutlined } from '@material-ui/icons';
import Rating from '@material-ui/lab';
import { useStyles } from './styles';
import {BoundsInterfaces, Coordinates} from '../../App';

interface Props {
  coordinates: Coordinates;
  setCoordinates: React.Dispatch<React.SetStateAction<Coordinates>>;
  setBounds: React.Dispatch<React.SetStateAction<BoundsInterfaces>>
}

export const Map = ({ coordinates, setCoordinates, setBounds }: Props) => {
  const classes = useStyles();
  const isMobile = useMediaQuery('(min-width:600px)');

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyBanw7MwVDrdzLFvb2WO7QSZI2fFZdqzoA' }}
        defaultCenter={coordinates}
        center={coordinates}
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
      ></GoogleMapReact>
    </div>
  );
};
