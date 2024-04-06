import { Region } from "react-native-maps";

import { DayInAWeek } from "@/enum/DayInAWeek";
import { ZoneType } from "@/enum/ParkingLot";

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
  images?: string[];
  businessDays: BusinessDay[];
  coord: Region,
  address: Address;
  plan: Plan[],
};

export type Address = {
  address1: string;
  sub_district: string;
  district: string;
  province: string;
  zip_code: string;
};

export type BusinessDay = {
  openTime: string;
  closeTime: string;
  day: DayInAWeek;
};

export type BusinessHour = {
  openTime: string;
  closeTime: string;
};

export type Plan = {
  floor: number;
  image: string;
  zone: Zone[];
};

export type Zone = {
  name: string;
  capacity?: number;
  type: ZoneType;
  price?: number;
  unit?: string;
};