import PlaceCard from '@/components/common/cards/place.card';

// const getPlaces = async () => {
//   const response = await fetch('http://localhost:8080/listing');
//   if (!response.ok) {
//     throw new Error(response.statusText);
//   }
//
//   const data = await response.json();
//   console.log(data);
//
//   return data;
// };

const PlacesGrid = () => {
  // const listings: ListingResponse[] =
  //   (await getListings()) as ListingResponse[];

  // const places = [{
  //   uuid: '1',
  //   title: 'Place 1',
  //   description: 'Description 1',
  //   location: {
  //     lat: 1,
  //     lng: 1,
  //     city: 'City 1',
  //     county: 'County 1',
  //   },
  //   price: 5.99,
  //   services: [],
  //   images: [],
  //   users: []
  // }];

  const places = [
    {
      uuid: '1',
      title: 'Place 1',
      description: 'Description 1',
      location: {
        lat: 1,
        lng: 1,
        city: 'City 1',
        county: 'County 1',
      },
      price: 5.99,
      image: {
        url: 'https://tuesfest.bg/_next/image?url=%2Fassets%2Fprojects%2FCSR%2Fthumbnail.webp&w=1920&q=75',
      },
    },
    {
      uuid: '2',
      title: 'Place 2',
      description: 'Description 1',
      location: {
        lat: 1,
        lng: 1,
        city: 'City 1',
        county: 'County 1',
      },
      price: 5.99,
      image: {
        url: 'https://tuesfest.bg/_next/image?url=%2Fassets%2Fprojects%2FCSR%2Fthumbnail.webp&w=1920&q=75',
      },
    },
    {
      uuid: '3',
      title: 'Place 3',
      description: 'Description 3',
      location: {
        lat: 1,
        lng: 1,
        city: 'City 1',
        county: 'County 1',
      },
      price: 5.99,
      image: {
        url: 'https://tuesfest.bg/_next/image?url=%2Fassets%2Fprojects%2FCSR%2Fthumbnail.webp&w=1920&q=75',
      },
    },
  ];

  return (
    // <div className='grid w-full grid-cols-1 gap-4 xl:grid-cols-2 2xl:grid-cols-3'>
    <div className='flex flex-wrap items-start justify-center gap-4'>
      {places.map((place) => (
        <PlaceCard key={place.uuid} place={place} />
      ))}
    </div>
  );
};

export default PlacesGrid;
