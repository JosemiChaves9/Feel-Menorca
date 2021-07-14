import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { Libraries } from "@react-google-maps/api/dist/utils/make-load-script-url";
import { useMemo } from "react";
import { MapStyle } from "./MapStyle";

interface Props {
  markers: MapMarker[];
  location: Location;
  zoom: number;
  onClickOnMarker: (marker: MapMarker) => void;
}

export interface MapMarker {
  location: Location;
  description: string;
}

interface Location {
  lat: number;
  lng: number;
}

const googleKey = process.env.NEXT_PUBLIC_GOOGLE_KEY;
const libraries: Libraries = ["places"];
const mapCointainerStyle = {
  width: "100%",
  height: "100%",
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
  styles: MapStyle as any,
};

export const Map = ({ markers, location, zoom, onClickOnMarker }: Props) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: googleKey,
    libraries,
  });

  const mapPosition = useMemo(() => {
    return location;
  }, []);

  if (loadError) return <p>"Error loading maps"</p>;
  if (!isLoaded) return <p>"Loading Maps"</p>;

  return (
    <>
      <GoogleMap
        mapContainerStyle={mapCointainerStyle}
        zoom={zoom}
        center={mapPosition}
        options={options}
      >
        {markers.map((marker: MapMarker) => (
          <Marker
            key={marker.description}
            position={{ lat: marker.location.lat, lng: marker.location.lng }}
            onClick={() => {
              onClickOnMarker(marker);
            }}
          />
        ))}
      </GoogleMap>
    </>
  );
};
