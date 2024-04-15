import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import DropdownInput from "./DropdownInput";
import TextInput from "./TextInput";
import IconButton from "../button/IconButton";
import SecondaryButton from "../button/SecondaryButton";

import Colors from "@/constants/color";
import { ActionMode } from "@/enum/ActionMode";
import { InputType } from "@/enum/InputType";
import { PriceRateUnit } from "@/enum/ParkingLot";
import { useParkingLot } from "@/store/context/parkingLot";
import { ZonePricing } from "@/types/parking-lot";

export type ParkingZonePrivilegeInputProps = {
  mode: ActionMode;
  zones: ZonePricing[];
  setZones: React.Dispatch<React.SetStateAction<ZonePricing[]>>;
};

const ParkingZonePrivilegeInput: React.FC<ParkingZonePrivilegeInputProps> = ({
  mode,
  zones,
  setZones,
}) => {
  const [floor, setFloor] = useState<string[]>([
    zones[0].floor?.toString() ?? "",
  ]);
  const [zone, setZone] = useState<string[]>([zones[0].zone ?? ""]);
  const [price, setPrice] = useState<number[]>([zones[0].price ?? 0]);
  const [unit, setUnit] = useState<PriceRateUnit[]>([
    zones[0].unit ?? PriceRateUnit.BAHT_PER_HOUR,
  ]);
  const { floorsAndZones } = useParkingLot();
  const [zoneDropdown, setZoneDropdown] = useState<string[][]>([
    floorsAndZones.find((x) => x.floor === +floor[0])?.zones || [],
  ]);

  useEffect(() => {
    for (let i = 0; i < floor.length; i++) {
      const newZone = {
        floor: +floor[i],
        zone: zone[i],
        price: price[i],
        unit: unit[i],
      };
      zones[i] = newZone;
    }
  }, [floor, zone, price, unit]);

  return (
    <ScrollView>
      <View style={{ gap: 5 }}>
        {zones.map((_, index) => {
          const idx = mode === ActionMode.CREATE ? index : 0;
          return (
            <View style={{ gap: 5 }}>
              <View style={styles.dropdownContainer}>
                <DropdownInput
                  title="Floor"
                  placeholder="Select floor"
                  selectedValue={floor[idx]}
                  isRequired={true}
                  onSelect={(f) => {
                    const newFloor = [...floor];
                    newFloor[idx] = f;
                    setFloor(newFloor);
                    const newDropdown = [...zoneDropdown];
                    newDropdown[idx] =
                      floorsAndZones.find((x) => x.floor === +f)?.zones || [];
                    setZoneDropdown(newDropdown);
                  }}
                  items={floorsAndZones.map((f) => {
                    const floor = f.floor.toString();
                    return { label: floor, value: floor };
                  })}
                  containerStyle={{ flex: 1 }}
                />
                <DropdownInput
                  title="Zone"
                  selectedValue={zone[idx]}
                  placeholder="Select zone"
                  isRequired={true}
                  onSelect={(z) => {
                    const newZone = [...zone];
                    newZone[idx] = z;
                    setZone(newZone);
                  }}
                  items={zoneDropdown[idx]?.map((z) => {
                    return { label: z, value: z };
                  })}
                  containerStyle={{ flex: 1 }}
                />
              </View>
              <View style={styles.sameLineInputContainer}>
                <TextInput
                  title="Price"
                  placeholder="Enter parking fee"
                  value={price[idx]?.toString()}
                  isRequired={true}
                  onChangeText={(p: string) => {
                    const newPrice = [...price];
                    newPrice[idx] = parseInt(p);
                    setPrice(newPrice);
                  }}
                  inputMode={InputType.Numeric}
                  containerStyle={{ flex: 1 }}
                />
                <DropdownInput
                  selectedValue={unit[idx]}
                  title="Unit"
                  placeholder={"Select fee unit"}
                  isRequired={true}
                  onSelect={(u: PriceRateUnit) => {
                    const newUnit = [...unit];
                    newUnit[idx] = u;
                    setUnit(newUnit);
                  }}
                  items={Object.values(PriceRateUnit).map((value) => {
                    return { label: value, value: value };
                  })}
                  containerStyle={{ flex: 1 }}
                />
              </View>
              {idx === zones.length - 1 && index !== 0 && (
                <IconButton
                  icon={"close"}
                  size={0}
                  color={""}
                  buttonStyle={styles.closeButton}
                  onPress={() => {
                    const newZones = [...zones];
                    newZones.splice(idx, 1);
                    setZones(newZones);
                    const newFloor = [...floor];
                    const newZone = [...zone];
                    const newPrice = [...price];
                    const newUnit = [...unit];
                    const newDropdown = [...zoneDropdown];
                    newFloor.splice(idx, 1);
                    newZone.splice(idx, 1);
                    newPrice.splice(idx, 1);
                    newUnit.splice(idx, 1);
                    newDropdown.splice(idx, 1);
                    setFloor(newFloor);
                    setZone(newZone);
                    setPrice(newPrice);
                    setUnit(newUnit);
                    setZoneDropdown(newDropdown);
                  }}
                />
              )}
              {index !== zones.length - 1 && <View style={styles.divider} />}
            </View>
          );
        })}
      </View>
      {mode === ActionMode.CREATE && (
        <SecondaryButton
          title="+ Add more zone"
          buttonStyle={styles.addZoneButton}
          textStyle={{ color: Colors.black }}
          onPress={() => {
            setZones([...zones, {}]);
            setFloor([...floor, ""]);
            setZone([...zone, ""]);
            setPrice([...price, 0]);
            setUnit([...unit, PriceRateUnit.BAHT_PER_HOUR]);
            setZoneDropdown([...zoneDropdown, []]);
          }}
        />
      )}
    </ScrollView>
  );
};

export default ParkingZonePrivilegeInput;

const styles = StyleSheet.create({
  dropdownContainer: {
    gap: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sameLineInputContainer: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
  },
  addZoneButton: {
    alignItems: "center",
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
  },
  closeButton: {
    position: "absolute",
    top: -205,
    right: -10,
  },
  divider: {
    borderWidth: 0.5,
    borderColor: Colors.gray[700],
    marginVertical: 15,
  },
});
