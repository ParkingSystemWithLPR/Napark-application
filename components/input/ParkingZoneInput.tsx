import { useEffect, useState } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { View, StyleSheet } from "react-native";

import DropdownInput from "./DropdownInput";
import IconButton from "../button/IconButton";
import SecondaryButton from "../button/SecondaryButton";
import MyTextInput from "../input/TextInput";

import Colors from "@/constants/color";
import { InputType } from "@/enum/InputType";
import { ZoneType } from "@/enum/ParkingLot";
import { ParkingLotRequest, Zone } from "@/types/parking-lot";
import { formatEnumtoDropdownItem } from "@/utils/dropdown";

export type ParkingZoneInputProps = {
  value: Zone[];
  onChange: (zones?: Zone[]) => void;
  floor: number;
  control: Control<ParkingLotRequest, any>;
  errors: FieldErrors<ParkingLotRequest>;
};

const ParkingZoneInput: React.FC<ParkingZoneInputProps> = ({
  value,
  onChange,
  floor,
  control,
  errors,
}) => {
  const [zones, setZones] = useState<Zone[]>();

  useEffect(() => {
    if (value && value !== zones) {
      const newZones: Zone[] = [];
      value.forEach((item) => {
        newZones.push(item);
      });
      setZones(newZones);
    }
  }, [value]);

  useEffect(() => {
    onChange(zones);
  }, [zones]);

  const onInputChange = (key: string, value: any, index: number) => {
    if (zones) {
      const editZone: Zone = {
        ...zones[index],
        [key]: value,
      };
      const newZones: Zone[] = [
        ...zones.slice(0, index),
        editZone,
        ...zones.slice(index + 1),
      ];
      setZones(newZones);
    }
  };

  const onAdd = () => {
    if (zones)
      setZones([
        ...zones,
        {
          name: "",
          type: ZoneType.NORMAL,
        },
      ]);
  };

  const onDelete = (index: number) => {
    if (zones) {
      setZones([...zones.slice(0, index), ...zones.slice(index + 1)]);
    }
  };

  const isDuplicateZone = (name: string, idx: number): boolean => {
    return (
      !!zones &&
      zones.filter((zone, index) => zone.name === name && index !== idx)
        .length !== 0
    );
  };

  return (
    <View>
      {zones &&
        zones.map((zone, index) => (
          <View key={`zone_${index}`}>
            <IconButton
              icon={"close"}
              size={0}
              color={Colors.black}
              buttonStyle={styles.closeButton}
              onPress={() => onDelete(index)}
            />
            <View style={styles.settingContainer}>
              <View style={styles.sameLineInputContainer}>
                <Controller
                  name={`plan.${floor}.zones.${index}.name`}
                  control={control}
                  rules={{
                    required: "Please enter zone name",
                    validate: (value) =>
                      !isDuplicateZone(value, index) ||
                      "Please enter different zone name",
                  }}
                  render={() => (
                    <MyTextInput
                      title="Zone"
                      placeholder={"Zone"}
                      value={zone.name}
                      onChangeText={(value) =>
                        onInputChange("name", value, index)
                      }
                      containerStyle={{ flex: 1 }}
                      errorText={
                        errors.plan &&
                        errors.plan[floor]?.zones?.[index]?.name?.message
                      }
                      isRequired
                      editable
                    />
                  )}
                />
                <Controller
                  name={`plan.${floor}.zones.${index}.capacity`}
                  control={control}
                  rules={{ required: "Please enter zone capacity" }}
                  render={() => (
                    <MyTextInput
                      title="Capacity"
                      placeholder={"Capacity"}
                      value={zone.capacity ? zone.capacity.toString() : ""}
                      onChangeText={(value) =>
                        onInputChange("capacity", parseInt(value), index)
                      }
                      containerStyle={{ flex: 1 }}
                      inputMode={InputType.Numeric}
                      errorText={
                        errors.plan &&
                        errors.plan[floor]?.zones?.[index]?.capacity?.message
                      }
                      isRequired
                      editable
                    />
                  )}
                />
              </View>
              <DropdownInput
                title={"Parking zone type"}
                selectedValue={zone.type}
                placeholder={"Select zone type"}
                onSelect={(selectedValue) =>
                  onInputChange("type", selectedValue, index)
                }
                items={formatEnumtoDropdownItem(ZoneType)}
                isRequired
              />
            </View>
          </View>
        ))}
      <SecondaryButton
        title="+ Add more zone to this floor"
        buttonStyle={styles.addZoneButton}
        textStyle={{ color: Colors.black }}
        onPress={() => onAdd()}
      />
    </View>
  );
};

export default ParkingZoneInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    gap: 10,
  },
  settingContainer: {
    zIndex: -1,
    borderRadius: 8,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  card: {},
  cardPressed: {
    opacity: 0.5,
  },
  image: {
    borderRadius: 12,
    marginRight: 10,
  },
  sameLineInputContainer: {
    paddingTop: 10,
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
  },
  closeButton: {
    position: "absolute",
    top: -10,
    right: -10,
  },
  addZoneButton: {
    alignItems: "center",
    flex: 1,
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
});
