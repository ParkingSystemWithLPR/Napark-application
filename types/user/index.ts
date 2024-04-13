export interface Car {
  _id: string;
  license_plate: string;
  province_of_reg: string;
}

export interface Profile {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  tel?: string;
  date_of_birth?: string;
  cars?: Car[];
  profile_image?: string;
  credit: number;
  default_car_id?: string;
}
