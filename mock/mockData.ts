import { THAI_PROVINCE } from "@/constants/province";
import { CardType } from "@/enum/CardType";
import { ParkingLot } from "@/types/parking-lot/ParkingLot";

export type mockedSessionsProps = {
  licensePlate: string;
  space: string;
  dateAndTime: string;
  price: string;
  id: string;
};

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

export const MOCKED_SESSIONS = [
  {
    licensePlate: "กข 1334",
    space: "space 4c",
    dateAndTime: "2024-02-26T14:55:31.615Z",
    price: "200",
    id: "1",
  },
  {
    licensePlate: "กข 1334",
    space: "space 4c",
    dateAndTime: "2024-02-26T14:55:31.615Z",
    price: "200",
    id: "2",
  },
  {
    licensePlate: "กข 1334",
    space: "space 4c",
    dateAndTime: "2024-02-26T14:55:31.615Z",
    price: "200",
    id: "3",
  },
  {
    licensePlate: "กข 1334",
    space: "space 4c",
    dateAndTime: "2024-02-26T14:55:31.615Z",
    price: "200",
    id: "4",
  },
  {
    licensePlate: "กข 1334",
    space: "space 4c",
    dateAndTime: "2024-02-26T14:55:31.615Z",
    price: "200",
    id: "15",
  },
  {
    licensePlate: "กข 1334",
    space: "space 4c",
    dateAndTime: "2024-02-26T14:55:31.615Z",
    price: "200",
    id: "6",
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

export const mockParkingLot: ParkingLot = {
  _id: "mockId",
  name: "mockName",
  address: {
    address: "mockAddress",
    sub_distict: "mockSubDistict",
    distict: "mockDistict",
    province: "mockProvince",
    zip_code: "10160",
  },
  coord: {
    latitude: 13.734836872447342,
    longitude: 100.53327154257514,
    latitudeDelta: 13.734836872447342,
    longitudeDelta: 100.53327154257514,
  },
  businessDays: {
    Monday: { isOpen: true },
    Tuesday: { isOpen: true, open_time: "08:00", close_time: "22:00" },
    Wednesday: { isOpen: false },
    Thursday: { isOpen: false },
    Friday: { isOpen: true, open_time: "11:00", close_time: "17:00" },
    Saturday: { isOpen: true, open_time: "12:00", close_time: "23:00" },
    Sunday: { isOpen: false },
  },
};
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
