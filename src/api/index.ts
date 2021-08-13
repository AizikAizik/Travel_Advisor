import axios, { AxiosRequestConfig } from 'axios';

const URL =
  'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';

export const fetchPlacesData = async () => {
  try {
    // make request
    const {
      data: { data },
    } = await axios.get(URL, {
      method: 'GET',
      url: URL,
      params: {
        bl_latitude: '11.847676',
        tr_latitude: '12.838442',
        bl_longitude: '109.095887',
        tr_longitude: '109.149359',
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
