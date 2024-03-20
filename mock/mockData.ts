import { ParkingLot } from "@/types/parking-lot/ParkingLot";

export interface mockedSessionsProps {
  licensePlate: string;
  space: string;
  dateAndTime: string;
  price: string;
  id: string;
}

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

export const mockParkingLot : ParkingLot = {
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
  }
};
