import { THAI_PROVINCE } from "@/constants/province";
import { BookingStatus } from "@/enum/BookingStatus";
import { CardType } from "@/enum/CardType";
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
