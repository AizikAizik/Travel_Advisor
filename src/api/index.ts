import axios from 'axios';
import {Coords} from "google-map-react";
import {DropdownItem} from "../types/indexTypes";

export const fetchPlacesData = async (dropDownText: DropdownItem, sw:Coords, ne:Coords) => {
  try {
    // make request
    const {
      data: { data },
    } = await axios.get(`https://travel-advisor.p.rapidapi.com/${dropDownText}/list-in-boundary`, {
      method: 'GET',
      //url: URL,
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
