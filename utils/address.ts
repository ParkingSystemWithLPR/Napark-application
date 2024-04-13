import { LatLng } from "react-native-maps";

import { Address } from "@/types/parking-lot";

export const formatAddress = ({
  address1,
  sub_district,
  district,
  province,
  zip_code,
}: Address): string => {
  return `${address1} ${sub_district} ${district} ${province} ${zip_code}`;
};

export const estimateDistance = (mark: LatLng, destination: LatLng) => {
  // using Haversine formula
  const R = 6371.071; // Radius of the Earth in kilometers
  const rlat1 = mark.latitude * (Math.PI / 180); // Convert degrees to radians
  const rlat2 = destination.latitude * (Math.PI / 180); // Convert degrees to radians
  const difflat = rlat2 - rlat1; // Radian difference (latitudes)
  const difflon = (destination.longitude - mark.longitude) * (Math.PI / 180); // Radian difference (longitudes)

  return (
    2 *
    R *
    Math.asin(
      Math.sqrt(
        Math.sin(difflat / 2) * Math.sin(difflat / 2) +
          Math.cos(rlat1) *
            Math.cos(rlat2) *
            Math.sin(difflon / 2) *
            Math.sin(difflon / 2)
      )
    )
  ).toFixed(2);
};
