import { useState } from "react";
import { Controller } from "react-hook-form";
import { ScrollView, StyleSheet, View } from "react-native";

import DropdownInput from "./DropdownInput";
import TextInput from "./TextInput";
import IconButton from "../button/IconButton";
import SecondaryButton from "../button/SecondaryButton";

import Colors from "@/constants/color";
import { ActionMode } from "@/enum/ActionMode";
import { PriceRateUnit } from "@/enum/ParkingLot";
import { MOCKED_ZONE_DROPDOWN } from "@/mock/mockData";
import { ZonePricing } from "@/types/parking-lot";
import { formatEnumtoDropdownItem } from "@/utils/dropdown";

export type ParkingZonePrivilegeInputProps = {
  value: ZonePricing[];
  onChange: (zones?: ZonePricing[]) => void;
  mode: ActionMode;
  zoneIndex: number;
  form: any;
};

const ParkingZonePrivilegeInput: React.FC<ParkingZonePrivilegeInputProps> = ({
  mode,
  zoneIndex,
  form,
}) => {
  const [zones, setZones] = useState<ZonePricing[]>([
    { floor: 0, zone: "A", price: 0, unit: "baht/hour" },
  ]);
  const { control, getValues, setValue } = form;

  return (
    <ScrollView>
      <View style={{ gap: 5 }}>
        {zones.map((_, index) => {
          const privilegeIndex =
            mode === ActionMode.CREATE ? zoneIndex + index : zoneIndex;
          return (
            <View style={{ gap: 5 }}>
              <View style={styles.dropdownContainer}>
                <Controller
                  name={`privilege.${privilegeIndex}.floor`}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <DropdownInput
                      title="Floor"
                      selectedValue={value}
                      placeholder="Select floor"
                      onSelect={onChange}
                      items={[{ label: "1", value: "1" }]}
                      containerStyle={{ flex: 1 }}
                    />
                  )}
                />
                <Controller
                  name={`privilege.${privilegeIndex}.zone`}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <DropdownInput
                      title="Zone"
                      selectedValue={value}
                      placeholder="Select zone"
                      onSelect={onChange}
                      items={MOCKED_ZONE_DROPDOWN.map((z) => {
                        return { label: z, value: z };
                      })}
                      containerStyle={{ flex: 1 }}
                    />
                  )}
                />
              </View>
              <View style={styles.sameLineInputContainer}>
                <Controller
                  name={`privilege.${privilegeIndex}.price`}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      title="Price"
                      placeholder="Enter parking fee"
                      value={value}
                      onChangeText={(value) => onChange(value)}
                      containerStyle={{ flex: 1 }}
                    />
                  )}
                />
                <Controller
                  name={`privilege.${privilegeIndex}.unit`}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <DropdownInput
                      selectedValue={value}
                      title="Unit"
                      placeholder={"Select fee unit"}
                      onSelect={(value) => onChange(value)}
                      items={formatEnumtoDropdownItem(PriceRateUnit)}
                      containerStyle={{ flex: 1 }}
                    />
                  )}
                />
              </View>
              {privilegeIndex === zones.length + zoneIndex - 1 &&
                index !== 0 && (
                  <IconButton
                    icon={"close"}
                    size={0}
                    color={""}
                    buttonStyle={styles.closeButton}
                    onPress={() => {
                      const newZone = zones;
                      newZone.splice(index, 1);
                      setZones(newZone);
                      const privilegeList: ZonePricing[] =
                        getValues("privilege");
                      privilegeList.splice(index + zoneIndex, 1);
                      setZones(zones);
                      setValue("privilege", privilegeList);
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
