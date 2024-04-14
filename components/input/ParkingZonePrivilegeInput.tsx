import { useCallback, useEffect, useMemo, useState } from "react";
import { Controller } from "react-hook-form";
import { ScrollView, StyleSheet, View } from "react-native";

import DropdownInput from "./DropdownInput";
import TextInput from "./TextInput";
import IconButton from "../button/IconButton";
import SecondaryButton from "../button/SecondaryButton";

import Colors from "@/constants/color";
import { ActionMode } from "@/enum/ActionMode";
import { InputType } from "@/enum/InputType";
import { PriceRateUnit } from "@/enum/ParkingLot";
import { MOCKED_ZONE_DROPDOWN } from "@/mock/mockData";
import { PrivilegeZone, useParkingLot } from "@/store/context/parkingLot";
import { ZonePricing } from "@/types/parking-lot";
import { formatEnumtoDropdownItem } from "@/utils/dropdown";

export type ParkingZonePrivilegeInputProps = {
  mode: ActionMode;
  form: any;
  zones: ZonePricing[];
  setZones: React.Dispatch<React.SetStateAction<ZonePricing[]>>;
};

const ParkingZonePrivilegeInput: React.FC<ParkingZonePrivilegeInputProps> = ({
  mode,
  form,
  zones,
  setZones,
}) => {
  return (
    <ScrollView>
      <View style={{ gap: 5 }}>
        {zones.map((_, index) => {
          const idx = mode === ActionMode.CREATE ? index : 0;
          const [floor, setFloor] = useState<string>();
          const [zone, setZone] = useState<string>();
          const [price, setPrice] = useState<number>(zones[idx].price);
          const [unit, setUnit] = useState<PriceRateUnit>();

          // useEffect(() => {
          //   const newZone = {floor, zone, price, unit}
          //   zones[idx] = newZone
          // }, [floor, price]);

          return (
            <View style={{ gap: 5 }}>
              <View style={styles.dropdownContainer}>
                <DropdownInput
                  title="Floor"
                  placeholder="Select floor"
                  selectedValue={floor}
                  onSelect={setFloor}
                  items={[{ label: "1", value: "1" }]}
                  containerStyle={{ flex: 1 }}
                />
                <DropdownInput
                  title="Zone"
                  selectedValue={zone}
                  placeholder="Select zone"
                  onSelect={setZone}
                  items={[{ label: "A", value: "A" }]}
                  containerStyle={{ flex: 1 }}
                />
              </View>
              <View style={styles.sameLineInputContainer}>
                <TextInput
                  title="Price"
                  placeholder="Enter parking fee"
                  value={price.toString()}
                  onChangeText={(price: string) => setPrice(+price)}
                  inputMode={InputType.Numeric}
                  containerStyle={{ flex: 1 }}
                />
                <DropdownInput
                  selectedValue={unit}
                  title="Unit"
                  placeholder={"Select fee unit"}
                  onSelect={setUnit}
                  items={formatEnumtoDropdownItem(PriceRateUnit)}
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
                    const newZone = zones;
                    newZone.splice(index, 1);
                    setZones(newZone);
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
            setZones([
              ...zones,
              { floor: 0, zone: "A", price: 0, unit: "baht/hour" },
            ]);
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
