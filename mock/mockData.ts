import { DropdownItem } from "@/components/input/DropdownInput";
import { THAI_PROVINCE } from "@/constants/province";
import { BookingStatus } from "@/enum/BookingStatus";
import { CardType } from "@/enum/CardType";
import { DayInAWeek } from "@/enum/DayInAWeek";
import { PriceRateUnit } from "@/enum/ParkingLot";
import { SlotType } from "@/enum/SlotType";
import { Booking } from "@/types/booking";
import { ParkingLot } from "@/types/parking-lot";

export type mockedBankAccount = {
  bankAccountNumber: string;
  bankName: string;
  bankBranch: string;
  id: string;
};

export type mockedCreditCard = {
  name: string;
  privilegeName: string;
  cardNumber: string;
  cardType: CardType;
};

export const mockedBooking: Booking[] = [
  {
    _id: "1",
    car_id: "",
    license_plate: "กข 1234",
    province: THAI_PROVINCE[0].value,
    end_time: "",
    estimated_price: 120,
    parkinglot_id: "",
    parkinglot_name: "Samyan Mitrtown",
    slot_id: "1",
    slot_name: "A1",
    start_time: "2024-02-26T14:55:31.615Z",
    status: BookingStatus.UPCOMING,
    user_id: "",
  },
  {
    _id: "2",
    car_id: "",
    license_plate: "กข 1234",
    province: THAI_PROVINCE[0].value,
    end_time: "",
    estimated_price: 120,
    parkinglot_id: "",
    parkinglot_name: "Samyan Mitrtown",
    slot_id: "2",
    slot_name: "B12",
    start_time: "2024-02-26T14:55:31.615Z",
    status: BookingStatus.UNPAID,
    user_id: "",
  },
  {
    _id: "3",
    car_id: "",
    license_plate: "กข 1234",
    province: THAI_PROVINCE[0].value,
    end_time: "",
    estimated_price: 120,
    parkinglot_id: "",
    parkinglot_name: "Samyan Mitrtown",
    slot_id: "3",
    slot_name: "C1",
    start_time: "2024-02-26T14:55:31.615Z",
    status: BookingStatus.PAID,
    user_id: "",
  },
  {
    _id: "4",
    car_id: "",
    license_plate: "กข 1234",
    province: THAI_PROVINCE[0].value,
    end_time: "",
    estimated_price: 120,
    parkinglot_id: "",
    parkinglot_name: "Samyan Mitrtown",
    slot_id: "4",
    slot_name: "D11",
    start_time: "2024-02-26T14:55:31.615Z",
    status: BookingStatus.COMPLETED,
    user_id: "",
  },
  {
    _id: "5",
    car_id: "",
    license_plate: "กข 1234",
    province: THAI_PROVINCE[0].value,
    end_time: "",
    estimated_price: 120,
    parkinglot_id: "",
    parkinglot_name: "Samyan Mitrtown",
    slot_id: "5",
    slot_name: "A2",
    start_time: "2024-02-26T14:55:31.615Z",
    status: BookingStatus.CANCELLED,
    user_id: "",
  },
  {
    _id: "6",
    car_id: "",
    license_plate: "กข 1234",
    province: THAI_PROVINCE[0].value,
    end_time: "",
    estimated_price: 120,
    parkinglot_id: "",
    parkinglot_name: "Samyan Mitrtown",
    slot_id: "6",
    slot_name: "A1",
    start_time: "2024-02-26T14:55:31.615Z",
    status: BookingStatus.UPCOMING,
    user_id: "",
  },
];

export const MOCKED_BANK_ACCOUNT = [
  {
    bankAccountNumber: "142-4-62745-1",
    bankName: "Kasikorn",
    bankBranch: "Central Lardphrao",
    id: "1",
  },
  {
    bankAccountNumber: "142-4-62745-1",
    bankName: "Kasikorn",
    bankBranch: "Central Lardphrao",
    id: "2",
  },
];

export const MOCKED_CREDIT_CARD = [
  {
    name: "Worashot Changankarn",
    privilegeName: "Amazon Platinum",
    cardNumber: "1234567887654321",
    cardType: CardType.VISA,
  },
  {
    name: "Worashot Changankarn",
    privilegeName: "Amazon Platinum",
    cardNumber: "1234567887654322",
    cardType: CardType.MASTER_CARD,
  },
];

export interface mockedPaymentLicensePlateProps {
  licensePlate: string;
  id: string;
  province: string;
}

export const MOCKED_PAYMENTLICENSEPLATE = [
  {
    id: "1",
    licensePlate: "ผบ 5982",
    province: THAI_PROVINCE[0].value,
  },
  {
    id: "2",
    licensePlate: "ฬห 8705",
    province: THAI_PROVINCE[0].value,
  },
  {
    id: "3",
    licensePlate: "รวย 9999",
    province: THAI_PROVINCE[0].value,
  },
  {
    id: "4",
    licensePlate: "เฮง 888",
    province: THAI_PROVINCE[0].value,
  },
];

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

export const MOCKED_ZONE = [
  {
    name: "A1",
    description: "60 baht/hr",
  },
  {
    name: "B2",
    description: "step pricing",
  },
];

export const MOCKED_ZONE_DROPDOWN = ["A", "B", "C"];

export const MOCKED_MANAGING_ROLE = ["CEO", "CEP", "CEQ"];
