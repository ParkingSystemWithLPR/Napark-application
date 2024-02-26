import { Address } from "../types/parking-lot/ParkingLot";

export const formatAddress = ({
  address,
  sub_distict,
  distict,
  province,
  zip_code,
}: Address): string => {
  return `${address} ${sub_distict} ${distict} ${province} ${zip_code}`;
};
