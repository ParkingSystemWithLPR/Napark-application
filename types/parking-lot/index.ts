import { LatLng } from "react-native-maps";

import { ImageProps } from "..";
import { SlotPriceProfile, SlotProfile } from "../booking";

import { DayInAWeek } from "@/enum/DayInAWeek";
import { PriceRateUnit, ZoneType } from "@/enum/ParkingLot";

export type ParkingLot = {
  _id: string;
  owner_id: string;
  name: string;
  slots: SlotProfile[];
  available_slots_count: number;
  address: Address;
  management_roles: ManagementRoleProfile[];
  parking_privileges: ParkingPrivilegeProfile[];
  coord: LatLng;
  images: string[];
  floor_images: FloorImage[];
  business_days: BusinessDay[];
  created_at: string;
  updated_at: string;
  is_open: boolean;
};

export type FloorImage = {
  floor: number;
  image: string;
};

export type ParkingLotRequest = {
  name: string;
  images?: ImageProps[];
  business_days: BusinessDay[];
  coord: LatLng;
  address: Address;
  plan: Plan[];
};

export type Address = {
  address1: string;
  sub_district: string;
  district: string;
  province: string;
  zip_code: string;
};

export type BusinessDay = {
  open_time: string;
  close_time: string;
  weekday: DayInAWeek;
};

export type BusinessHour = {
  open_time: string;
  close_time: string;
};

export type Plan = {
  floor: number;
  image: ImageProps;
  zones: Zone[];
};

export type Zone = {
  name: string;
  capacity?: number;
  type: ZoneType;
  price?: number;
  price_unit?: string;
};

export type ManagementRoleProfile = {
  title: string;
  user_ids: string[];
  permissions: ManagementPermission;
};

export type ManagementPermission = {
  manage_parking_space: boolean;
  edit_management_role: boolean;
  assign_management_role_members: boolean;
  edit_parking_privilege: boolean;
  assign_parking_privilege_members: boolean;
};

export type ParkingPrivilegeProfile = {
  title: string;
  user_ids: string[];
  slot_prices: SlotPriceProfile[];
};

export type ZonePricing = {
  floor?: number;
  zone?: string;
  price?: number;
  unit?: PriceRateUnit;
};
