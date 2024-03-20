import { Region } from "react-native-maps";

import { DayInAWeek } from "@/enum/DayInAWeek";

export type ParkingLot = {
  _id: string,
  name: string,
  address: Address;
  coord: Region,
  businessDays?: BusinessDay,
  images?: string[],
  availability?: number,
};

export type ParkingLotRequest = {
  name: string,
  businessDays: BusinessDay,
  images? : string[],
}

export type Address = {
  address: string;
  sub_distict: string;
  distict: string;
  province: string;
  zip_code: string;
};

export type BusinessDay = {
  [day in DayInAWeek]: { isOpen: boolean, openTime?: string; closeTime?: string; };
};
