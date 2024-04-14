import { ReactNode, createContext, useContext, useMemo, useState } from "react";

import { PriceRateUnit } from "@/enum/ParkingLot";
import { ParkingLot } from "@/types/parking-lot";

export type PrivilegeZone = {
  floor: number;
  zone: string;
  price: number;
  unit: PriceRateUnit;
};

interface IParkingLotContext {
  parkingLot: ParkingLot;
  setParkingLot: (parkingLot: ParkingLot) => void;
  getPrivilegeArea: (index: number) => PrivilegeZone[];
  floorsAndZones: { floor: number; zones: string[] }[];
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
  getPrivilegeArea: () => [],
  floorsAndZones: [],
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

  const getPrivilegeArea = (index: number) => {
    const privilegeArea = useMemo(() => {
      return Object.values(
        parkingLot.parking_privileges[index].slot_prices.reduce(
          (acc: { [key: string]: PrivilegeZone }, obj) => {
            const key = `${obj.floor} ${obj.zone}`;
            if (!acc[key]) {
              acc[key] = {
                floor: obj.floor,
                zone: obj.zone,
                price: obj.price_rate,
                unit: obj.price_rate_unit,
              };
            }
            return acc;
          },
          {}
        )
      );
    }, [parkingLot.parking_privileges[index]]);
    return privilegeArea;
  };

  const floorsAndZones = useMemo(() => {
    return Object.values(
      parkingLot.slots.reduce((acc: { [key: number]: any }, obj) => {
        const { floor, zone } = obj;
        if (!acc[floor]) {
          acc[floor] = { floor, zones: [] };
        }
        if (!acc[floor].zones.includes(zone)) {
          acc[floor].zones.push(zone);
        }
        return acc;
      }, {})
    );
  }, [parkingLot]);

  const value: IParkingLotContext = {
    parkingLot,
    setParkingLot,
    getPrivilegeArea,
    floorsAndZones,
  };

  return (
    <ParkingLotContext.Provider value={value}>
      {children}
    </ParkingLotContext.Provider>
  );
};

export default ParkingLotContextProvider;
