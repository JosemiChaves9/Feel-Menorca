import { BaseHeader } from '../components/BaseHeader/BaseHeader';
import { BannerSearch } from '../components/BannerSearch/BannerSearch';
import { useQuery } from '@apollo/client';
import { GET_SPOTS } from '../gql/SpotQueries';
import { Map, MapMarker } from '../components/Map/Map';
import { useState } from 'react';
import { QueryResultRender } from '../components/QueryResultRender/QueryResultRender';
import { GET_SPOTS_LOCATIONS } from '../gql/SpotsLocationsQueries';
import styles from './Index.module.scss';
import { BestPlaces } from '../components/BestPlaces/BestPlaces';
import { GET_BEST_SPOTS } from '../gql/BestSpotsQueries';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInfinity,
  faLock,
  faUmbrellaBeach,
} from '@fortawesome/free-solid-svg-icons';

interface SpotsData {
  spots: {
    title: string;
    slug: string;
  }[];
}

interface SpotsLocationsData {
  spots: {
    description: string;
    location: {
      lat: number;
      lng: number;
    };
  }[];
}

interface BestSpotsData {
  spots: {
    title: string;
    mainImageUrl: string;
    slug: string;
  }[];
}

const numberOfBestPlaces = 4;
const mapLocation = { lat: 39.952912, lng: 4.066163 };
const mapZoom = 10;

export default function Home() {
  const [mapMarker, setMapMarker] = useState<MapMarker>();
  const spotsQuery = useQuery<SpotsData>(GET_SPOTS);
  const spotsLocationsQuery = useQuery<SpotsLocationsData>(GET_SPOTS_LOCATIONS);
  const bestSpotsQuery = useQuery<BestSpotsData>(GET_BEST_SPOTS, {
    variables: { query: { isHighlighted: true }, limit: numberOfBestPlaces },
  });

  return (
    <div>
      <QueryResultRender
        queryResults={[
          { dataQuery: spotsQuery, dataKey: 'spots' },
          { dataQuery: spotsLocationsQuery, dataKey: 'spots' },
          { dataQuery: bestSpotsQuery, dataKey: 'spots' },
        ]}>
        {([spotsData, spotsLocationData, bestSpotsData]) => (
          <>
            <BaseHeader />
            <BannerSearch spots={spotsData} />
            <section className='py-6'>
              <div className='container'>
                <div className='text-center pb-lg-4'>
                  <p className='subtitle text-secondary'>
                    La mejor opción para alquilar en la isla
                  </p>
                  <h2 className='mb-5'>Somos flexibles, cómodos y seguros</h2>
                </div>
                <div className='row'>
                  <div className='col-lg-4 mb-3 mb-lg-0 text-center'>
                    <div className='px-0 px-lg-3'>
                      <div className='icon-rounded bg-primary mb-3'>
                        <FontAwesomeIcon icon={faInfinity}></FontAwesomeIcon>
                      </div>
                      <h3 className='h5'>Flexible</h3>
                      <p className='text-muted'>
                        Cambia de día, de playa o cancela sin penalización
                      </p>
                    </div>
                  </div>
                  <div className='col-lg-4 mb-3 mb-lg-0 text-center'>
                    <div className='px-0 px-lg-3'>
                      <div className='icon-rounded bg-primary mb-3'>
                        <FontAwesomeIcon
                          icon={faUmbrellaBeach}></FontAwesomeIcon>
                      </div>
                      <h3 className='h5'>Cómodo</h3>
                      <p className='text-muted'>
                        Busca tu playa ideal y reserva en 5 minutos
                      </p>
                    </div>
                  </div>
                  <div className='col-lg-4 mb-3 mb-lg-0 text-center'>
                    <div className='px-0 px-lg-3'>
                      <div className='icon-rounded bg-primary mb-3'>
                        <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
                      </div>
                      <h3 className='h5'>Seguro</h3>
                      <p className='text-muted'>
                        Pago seguro en nuestra plataforma. Olvídate del
                        efectivo.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <BestPlaces spots={bestSpotsData} />
            <div className={`${styles.mapContainer} shadow mx-2 mb-2`}>
              <Map
                markers={spotsLocationData}
                location={mapLocation}
                zoom={mapZoom}
                onClickOnMarker={(marker: MapMarker) => setMapMarker(marker)}
              />
            </div>
          </>
        )}
      </QueryResultRender>
    </div>
  );
}
