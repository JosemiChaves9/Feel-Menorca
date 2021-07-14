import { useQuery } from "@apollo/client";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { QueryResultRender } from "../../../components/QueryResultRender/QueryResultRender";
import { SPOT } from "../../../gql/OneSpotQueries";
import { Map, MapMarker } from "../../../components/Map/Map";
import { useState } from "react";
import styles from "./Index.module.scss";
import { useRouter } from "next/router";
import { BasePageLayout } from "../../../components/BasePageLayout/BasePageLayout";
import { QuickReservation } from "../../../components/QuickReservation/QuickReservation";
import { QuickReservationResult } from "../../../components/QuickReservation/QuickReservationResult";
import { TempReservationService } from "../../../services/TempReservationService";

const Spot = () => {
  const router = useRouter();
  const { slug, date } = (router.query as { slug: string, date: string });

  const [mapMarker, setMapMarker] = useState<MapMarker>();
  const spotQueryResult = useQuery(SPOT, {
    variables: { slug },
  });

  const onClickOnReserve = (quickReservationResult: QuickReservationResult) => {
    TempReservationService.setTempReservation({
      ...quickReservationResult,
      spotId: spotQueryResult.data.spot._id,
    });
    router.push("/reserve");
  };

  return (
    <QueryResultRender
      queryResults={[{ dataQuery: spotQueryResult, dataKey: "spot" }]}
    >
      {([spotData]) => (
        <>
          <BasePageLayout>
            <section>
              <img className="w-100" src={spotData.mainImageUrl} />
            </section>
            <div className="container py-5">
              <div className="row">
                <div className="col-lg-8">
                  <div className="text-block pb-4">
                    <p className="text-primary">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                      {spotData.locationName}
                    </p>
                    <h1>Alquiler de Kayak en {spotData.title}</h1>
                    <p className="text-muted font-weight-light">
                      {spotData.description}
                    </p>
                    <h6 className="mb-3">Rutas</h6>
                    <ul className="text-muted font-weight-light">
                      <li>TV with Netflix and DirectTVNow</li>
                      <li>Free WiFi</li>
                      <li>Gourmet Coffee/Tea making supplies</li>
                      <li>Fresh Sheets and Towels</li>
                      <li>
                        Toaster, microwave, pots and pans and basic cooking
                        needs like salt, pepper, sugar, and olive oil.
                      </li>
                      <li>Air Conditioning to keep you cool all summer!</li>
                    </ul>
                  </div>
                  <div className={`${styles.mapContainer} shadow`}>
                    <Map
                      markers={[spotData]}
                      location={spotData.location}
                      zoom={14}
                      onClickOnMarker={(marker: MapMarker) =>
                        setMapMarker(marker)
                      }
                    />
                  </div>
                </div>
                <div className="col-lg-4 mt-4">
                  <QuickReservation
                    enableSessionStoragePersist
                    sessionStoragePersistKey={`quick-reservation-${slug}`}
                    kayakTypes={spotData.kayakTypes}
                    onClickOnReserve={(quickReservationResult) =>
                      onClickOnReserve(quickReservationResult)
                    }
                    dateProvided={date}
                  />
                </div>
              </div>
            </div>
          </BasePageLayout>
        </>
      )}
    </QueryResultRender>
  );
};

export default Spot;
