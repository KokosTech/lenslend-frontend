import { CardPlace } from '@/types/data/place.type';
import PlaceCard from '@/components/common/cards/place.card';

const CATEGORY = 'Places';

const PlacesSearch = ({ places }: { places: CardPlace[] }) => (
  <div className='grid w-full grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3'>
    {places.map((place) => (
      <PlaceCard place={place} key={place.uuid} />
    ))}
  </div>
);

export default PlacesSearch;
