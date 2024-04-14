import { BookingStatus } from "@/enum/BookingStatus";
import { PriceRateUnit } from "@/enum/ParkingLot";
import { SlotType } from "@/enum/SlotType";

export interface AvailableSlotResponse {
  recommended_slots: SlotProfileWithPrivilege | null;
  available_slots: SlotProfileWithPrivilege[];
}

export interface SlotProfileWithPrivilege {
  _id: string;
  default_price_rate: number;
  default_price_rate_unit: string;
  estimated_price: number;
  floor: number;
  is_for_disabled: boolean;
  is_privilege_available: boolean;
  is_vacant: boolean;
  name: string;
  privilege_price_rate: number;
  privilege_price_unit: string;
}

export interface SlotProfile {
  _id: string;
  name: string;
  floor: number;
  zone: string;
  type: SlotType;
  is_vacant: boolean;
  default_price_rate: number;
  default_price_rate_unit: PriceRateUnit;
}

export interface SlotPriceProfile {
  slot_id: string;
  floor: number;
  zone: string;
  price_rate: number;
  price_rate_unit: PriceRateUnit;
}

export interface CreateBookingRequest {
  car_id: string;
  end_date: string;
  end_time: string;
  parkinglot_id: string;
  slot_id: string;
  start_date: string;
  start_time: string;
}

export interface Booking {
  _id: string;
  car_id: string;
  license_plate: string;
  province: string;
  end_time: string;
  estimated_price: number;
  parkinglot_id: string;
  parkinglot_name: string;
  slot_id: string;
  slot_name: string;
  start_time: string;
  status: BookingStatus;
  user_id: string;
}
