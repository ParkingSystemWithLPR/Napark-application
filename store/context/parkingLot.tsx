import { ReactNode, createContext, useContext, useState } from "react";

import { ParkingLot } from "@/types/parking-lot";

interface IParkingLotContext {
  parkingLot: ParkingLot;
  setParkingLot: (parkingLot: ParkingLot) => void;
}

export const ParkingLotContext = createContext<IParkingLotContext>({
  parkingLot: {
    _id: "",
    owner_id: "",
    name: "",
    slots: [],
    available_slots_count: 0,
    address: {
      address1: "",
      sub_district: "",
      district: "",
      province: "",
      zip_code: "",
    },
    management_roles: [],
    parking_privileges: [],
    coord: {
      latitude: 0,
      longitude: 0,
    },
    images: [],
    floor_images: [],
    business_days: [],
    created_at: "",
    updated_at: "",
    is_open: false,
  },
  setParkingLot: () => {},
});

export const useParkingLot = () => {
  const context = useContext(ParkingLotContext);
  if (!context) {
    throw new Error("useParkingLot must be used within a ParkingLotProvider");
  }
  return context;
};

const ParkingLotContextProvider = ({ children }: { children: ReactNode }) => {
  const [parkingLot, setParkingLot] = useState<ParkingLot>({
    _id: "",
    owner_id: "",
    name: "",
    slots: [],
    available_slots_count: 0,
    address: {
      address1: "",
      sub_district: "",
      district: "",
      province: "",
      zip_code: "",
    },
    management_roles: [],
    parking_privileges: [],
    coord: {
      latitude: 0,
      longitude: 0,
    },
    images: [],
    floor_images: [],
    business_days: [],
    created_at: "",
    updated_at: "",
    is_open: false,
  });

  const value: IParkingLotContext = {
    parkingLot,
    setParkingLot,
  };

  return (
    <ParkingLotContext.Provider value={value}>
      {children}
    </ParkingLotContext.Provider>
  );
};

export default ParkingLotContextProvider;
