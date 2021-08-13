import React, { useState, useEffect } from 'react';
import { Grid, CssBaseline } from '@material-ui/core';
import { Map } from './components/map/Map';
import { Header } from './components/header/Header';
import { List } from './components/list/List';
import { fetchPlacesData } from './api';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface BoundsInterfaces {
  ne: number;
  sw: number;
}

function App() {
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState<Coordinates>({
    lat: 0,
    lng: 0,
  });
  const [bounds, setBounds] = useState<BoundsInterfaces | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({
          lat: latitude,
          lng: longitude,
        });
      }
    );
  }, []);

  useEffect(() => {
    console.log(coordinates);
    console.log(bounds);

    fetchPlacesData().then((data) => {
      console.log(data);
      setPlaces(data);
    });
  }, [coordinates, bounds]);

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map coordinates={coordinates} setCoordinates={setCoordinates} />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
