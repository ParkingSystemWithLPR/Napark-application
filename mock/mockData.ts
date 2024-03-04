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

export const MOCKED_PARKING_SPACE = {
  _id: "1",
  name: "PolSci's Parking building | Chulalongkorn university",
  address: "1234",
  sub_distict: "A",
  distict: "B",
  province: "Bangkok",
  zip_code: "10140",
  coord: {
    latitude: 1,
    longitude: 1,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  },
  businessHours: "08:00 - 23:59",
  availability: 100,
};
