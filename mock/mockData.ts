import { DayInAWeek } from "@/enum/DayInAWeek";
import { PriceRateUnit } from "@/enum/ParkingLot";
import { SlotType } from "@/enum/SlotType";
import { ParkingLot } from "@/types/parking-lot";

export const mockParkingLot: ParkingLot = {
  _id: "660ecca7e55e2ede401ec843",
  owner_id: "65e5481524315e45c536f6b9",
  name: "string",
  slots: [
    {
      _id: "660ecca7e55e2ede401ec844",
      name: "string",
      floor: 1,
      zone: "",
      type: SlotType.Normal,
      is_vacant: true,
      default_price_rate: 1,
      default_price_rate_unit: PriceRateUnit.BAHT_PER_DAY,
    },
  ],
  available_slots_count: 3,
  address: {
    address1: "string",
    sub_district: "string",
    district: "string",
    province: "string",
    zip_code: "string",
  },
  management_roles: [],
  parking_privileges: [],
  coord: {
    latitude: 10,
    longitude: 10,
  },
  images: [""],
  floor_images: [],
  business_days: [
    {
      weekday: DayInAWeek.SUNDAY,
      open_time: "08:00:00",
      close_time: "23:00:00",
    },
  ],
  created_at: "2024-04-04T22:52:07.89+07:00",
  updated_at: "2024-04-04T22:52:07.89+07:00",
  is_open: true,
};
