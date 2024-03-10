export type ParkingLot = {
  _id: string;
  name: string;
  address: string;
  sub_distict: string;
  distict: string;
  province: string;
  zip_code: string;
  coord: {
    lat: number;
    lng: number;
    lat_delta?: number;
    lng_delta?: number;
  };
  businessHours?: string;
  availability?: number;
};

export type Address = {
  address: string;
  sub_distict: string;
  distict: string;
  province: string;
  zip_code: string;
};
