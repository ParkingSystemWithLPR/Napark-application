import { Region } from "react-native-maps";

import { DayInAWeek } from "@/enum/DayInAWeek";

export type ParkingLot = {
  _id: string;
  name: string;
  address: Address;
  coord: Region,
  businessDays?: BusinessDay,
  images?: string[],
  plan: Plan[],
  availability?: number,
};

export type ParkingLotRequest = {
  name: string;
  businessDays: BusinessDay;
  images?: string[];
};

export type Address = {
  address1: string;
  sub_district: string;
  district: string;
  province: string;
  zip_code: string;
};

export type BusinessDay = {
  [day in DayInAWeek]?: BusinessHour;
};

export type BusinessHour = {
  openTime: string;
  closeTime: string;
};

export type Plan = {
  image: string;
  floor: number;
}