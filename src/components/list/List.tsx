import React, {useState, useEffect, createRef} from 'react';
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from '@material-ui/core';
import { useStyles } from './styles';
import { PlaceDetails } from '../placedetails/PlaceDetails';
import {DropdownItem} from "../../types/indexTypes";



interface Props {
  places: Array<any>;
  childClicked?: any;
  isLoading: boolean;
  rating: string;
  setRating: React.Dispatch<React.SetStateAction<string>>
  dropDownText: DropdownItem;
  setDropDownText: React.Dispatch<React.SetStateAction<DropdownItem>>
}

export const List = (
    {
      places,
      childClicked,
      isLoading,
      rating,
      setRating,
      dropDownText,
      setDropDownText
    }: Props) => {
  const classes = useStyles();
  const [elementRef, setElementRef] = useState<Array<any>>([]);
  //console.log({childClicked})

    useEffect(() => {
        setElementRef((refs) => Array(places.length).fill(places).map((_, i) => refs[i] || createRef()));
    }, [places])

  return (
    <div className={classes.container}>
      <Typography variant='h4'>
        Restaurants, Hotels & Attractions around you
      </Typography>
        {
            isLoading ? (
                <div className={classes.loading}>
                    <CircularProgress size="5rem" />
                </div>
            ) : (
                <>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Type</InputLabel>
                        <Select
                            value={dropDownText}
                            onChange={(e) => setDropDownText(e.target.value as DropdownItem)}
                        >
                            <MenuItem value='restaurants'>Restaurants</MenuItem>
                            <MenuItem value='hotels'>Hotels</MenuItem>
                            <MenuItem value='attractions'>Attractions</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Rating</InputLabel>
                        <Select
                            value={rating}
                            onChange={(e) => setRating(e.target.value as string)}
                        >
                            <MenuItem value={0}>All</MenuItem>
                            <MenuItem value={3}>Above 3.0</MenuItem>
                            <MenuItem value={4}>Above 4.0</MenuItem>
                            <MenuItem value={4.5}>Above 4.5</MenuItem>
                        </Select>
                    </FormControl>
                    <Grid container spacing={3} className={classes.list}>
                        {places &&
                        places.map((place, idx) => (
                            <Grid item key={idx} xs={12} ref={elementRef[idx]}>
                                <PlaceDetails
                                    place={place}
                                    selected={Number(childClicked) === idx}
                                    refProp={elementRef[idx]}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </>
            )
        }
    </div>
  );
};
