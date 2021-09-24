import React, { useState, useEffect } from 'react';
import { Grid, CssBaseline } from '@material-ui/core';
import { Map } from './components/map/Map';
import { Header } from './components/header/Header';
import { List } from './components/list/List';
import { fetchPlacesData } from './api';
import {BoundsInterfaces, Coordinates, DropdownItem} from "./types/indexTypes";

function App() {
  const [places, setPlaces] = useState<any[]>([]);
  const [coordinates, setCoordinates] = useState<Coordinates>({
    lat: 0,
    lng: 0,
  });
  const [bounds, setBounds] = useState<BoundsInterfaces>({
    ne: {lat:0, lng:0},
    sw: {lat:0, lng:0},
  });
  const [childClicked, setChildClicked] = useState(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const[rating, setRating] = useState<string>("");
  const [dropDownText, setDropDownText] = useState<DropdownItem>('restaurants');
  const [filteredPlaces, setFilteredPlaces] = useState<Array<any>>([]);

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
    const filterPlaces = places.filter((place: any) => place.rating > Number(rating));

    setFilteredPlaces(filterPlaces);
  }, [rating])

  useEffect(() => {
    setIsLoading(true)
    fetchPlacesData(dropDownText, bounds.sw, bounds.ne).then((data) => {
      console.log(data);
      setFilteredPlaces([]);
      setPlaces(data);
      setIsLoading(false);
    });
  }, [coordinates, bounds, dropDownText]);

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List
              places={filteredPlaces.length ? filteredPlaces : places}
              childClicked={childClicked}
              isLoading={isLoading}
              rating={rating}
              setRating={setRating}
              dropDownText={dropDownText}
              setDropDownText={setDropDownText}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
              setBounds = {setBounds}
              coordinates={coordinates}
              setCoordinates={setCoordinates}
              setChildClicked={setChildClicked}
              places={filteredPlaces.length ? filteredPlaces : places}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
