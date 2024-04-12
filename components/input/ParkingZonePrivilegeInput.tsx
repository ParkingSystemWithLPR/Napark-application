import { Alert, StyleSheet, View } from "react-native";
import DropdownInput from "./DropdownInput";
import { Controller, FieldValues, useForm } from "react-hook-form";
import TextInput from "./TextInput";
import { formatEnumtoDropdownItem } from "@/utils/dropdown";
import { PriceRateUnit } from "@/enum/ParkingLot";
import { useEffect, useState } from "react";
import { MOCKED_ZONE_DROPDOWN } from "@/mock/mockData";
import StepPricing from "../pricingRule/StepPricing";
import SecondaryButton from "../button/SecondaryButton";
import Colors from "@/constants/color";
import IconButton from "../button/IconButton";
import { ZonePricing } from "@/types/parking-lot/ParkingLot";

export type ParkingZonePrivilegeInputProps = {
  value: ZonePricing[];
  onChange: (zones?: ZonePricing[]) => void;
  control: any;
};

const ParkingZonePrivilegeInput: React.FC<ParkingZonePrivilegeInputProps> = ({
  value,
  onChange,
  control,
}) => {
  const [zones, setZones] = useState<ZonePricing[]>(
    value ?? [{ floor: 0, zone: "A", price: 0, unit: "baht/hour" }]
  );

  return (
    <View>
      <View style={{ gap: 5 }}>
        {zones.map((_, index) => (
          <View style={{ gap: 5 }}>
            <View style={styles.dropdownContainer}>
              <Controller
                name={`privilege.${index}.floor`}
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
                name={`privilege.${index}.zone`}
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
                name={`privilege.${index}.price`}
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
                name={`privilege.${index}.unit`}
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
            {index !== 0 && (
              <IconButton
                icon={"close"}
                size={0}
                color={""}
                buttonStyle={styles.closeButton}
                onPress={() =>
                  setZones([
                    ...zones.slice(0, index - 1),
                    ...zones.slice(index),
                  ])
                }
              />
            )}
            {index !== zones.length - 1 && <View style={styles.divider} />}
          </View>
        ))}
      </View>
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
    </View>
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
