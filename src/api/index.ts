import axios, { AxiosRequestConfig } from 'axios';
import {Coords} from "google-map-react";

const URL =
  'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';

export const fetchPlacesData = async (sw:Coords, ne:Coords) => {
  try {
    // make request
    const {
      data: { data },
    } = await axios.get(URL, {
      method: 'GET',
      url: URL,
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
      },
      headers: {
        'x-rapidapi-key': '93efd19023mshb317de724cb82c6p148d7ejsndb8724c5875f',
        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
      },
    });

    return data;
  } catch (error) {
    console.error(error);
  }
};
