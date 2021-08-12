import React from 'react';

type PlaceType = {
  name: string;
};

export interface PlaceDetailsProps {
  place: PlaceType;
}

export const PlaceDetails = ({ place }: PlaceDetailsProps) => {
  return <h3>{place.name}</h3>;
};
