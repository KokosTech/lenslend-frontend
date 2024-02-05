import PlaceCard from '@/components/common/cards/place.card';
import { API_URL } from '@/configs/api';

const getPlaces = async () => {
  const response = await fetch(`${API_URL}/place?format=card`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = (await response.json()) as {
    uuid: string;
    name: string;
    lat: number;
    lng: number;
    images: {
      url: string;
    }[];
  }[];

  return data;
};

const PlacesGrid = async () => {
  const places = await getPlaces();

  if (!places) return null;

  return (
    <div className='grid w-full grid-cols-1 gap-4 p-2 lg:grid-cols-2 2xl:grid-cols-3'>
      {places.map((place) => (
        <PlaceCard key={place.uuid} place={place} />
      ))}
    </div>
  );
};

export default PlacesGrid;
