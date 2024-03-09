export interface Car {
  license_plate: string;
  province_of_reg: string;
  is_default: boolean;
}

export interface Profile {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  tel?: string;
  date_of_birth?: string;
  user_car?: Car[];
}
