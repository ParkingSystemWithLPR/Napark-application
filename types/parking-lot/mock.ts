import { ParkingLot } from "./ParkingLot";

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