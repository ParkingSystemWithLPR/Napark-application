import { Region } from "react-native-maps";

export type ParkingLot = {
  _id: string,
  name: string,
  address: Address;
  coord: Region,
  businessHours?: string,
  availability?: number,
};

export type Address = {
  address: string;
  sub_distict: string;
  distict: string;
  province: string;
  zip_code: string;
};
