import { useEffect, useRef, useState } from 'react';
import { Marker, MarkerClusterer } from '@googlemaps/markerclusterer';
import { AdvancedMarker, useMap } from '@vis.gl/react-google-maps';
import { ShortPlace } from '@/types/data/place.type';

const MarkersMap = ({
  data,
  openPlace,
  setOpenPlace,
}: {
  data: ShortPlace[];
  openPlace: string | null;
  setOpenPlace: (uuid: string | null) => void;
}) => {
  const map = useMap();
  const [markers, setMarkers] = useState<{
    [key: string]: Marker;
  }>({});
  const cluster = useRef<MarkerClusterer | null>(null);

  const setMarkerRef = (marker: Marker | null, key: string) => {
    if (marker && markers[key]) return;
    if (!marker && !markers[key]) return;

    setMarkers((prev) => {
      if (marker) {
        return {
          ...prev,
          [key]: marker,
        };
      } else {
        const newMarkers = { ...prev };
        delete newMarkers[key];
        return newMarkers;
      }
    });
  };

  useEffect(() => {
    if (!map || !data) return;
    if (!cluster.current) {
      cluster.current = new MarkerClusterer({ map });
    }
  }, [map, data]);

  useEffect(() => {
    if (!cluster.current) return;

    cluster.current.clearMarkers();
    cluster.current.addMarkers(Object.values(markers));
  }, [markers]);

  return (
    <>
      {data.map((place) => (
        <AdvancedMarker
          key={place.uuid}
          position={{
            lat: place.lat,
            lng: place.lng,
          }}
          onClick={() => {
            if (openPlace === place.uuid) {
              setOpenPlace(null);
            } else {
              setOpenPlace(place.uuid);
            }
          }}
          ref={(marker) => {
            setMarkerRef(marker, place.uuid);
          }}
        >
          <span className='text-5xl'>{place.icon}</span>
        </AdvancedMarker>
      ))}
    </>
  );
};

export default MarkersMap;
