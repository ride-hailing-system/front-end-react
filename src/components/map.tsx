import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { MAP_API_KEY } from "../utils/globalVariables";
import { useEffect, useState } from "react";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  latitude: 9.03,
  longitude: 38.74,
  description: "",
};

export type OnCalculateType = {
  distanceInKm?: number;
};

export type MapTypes = {
  from?: {
    latitude: number;
    longitude: number;
    description: string;
  };
  to?: {
    latitude: number;
    longitude: number;
    description: string;
  };
  onCalculate?: (value: OnCalculateType | undefined) => void;
};

const Map = ({ from = center, to, onCalculate }: MapTypes) => {
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);

  useEffect(() => {
    if (!to) return;
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: { lat: from.latitude, lng: from.longitude },
        destination: { lat: to.latitude, lng: to.longitude },
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result: any, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          const distanceInMeters = result.routes[0].legs[0].distance.value;
          const distanceInKm = distanceInMeters / 1000;
          onCalculate &&
            onCalculate({
              distanceInKm,
            });
          setDirections(result);
        }
      }
    );
  }, [from, to]);

  useEffect(() => {
    if (!from || !to) {
      onCalculate && onCalculate(undefined);
    }
  }, [from, to]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: MAP_API_KEY,
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat: from.latitude, lng: from.longitude }}
      zoom={13}
    >
      {from && (
        <Marker position={{ lat: from.latitude, lng: from.longitude }} />
      )}
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
};

export default Map;
