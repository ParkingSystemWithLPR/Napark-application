import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View, StyleSheet } from "react-native";

import MyTextInput from "../input/TextInput";
import SecondaryButton from "../button/SecondaryButton";
import IconButton from "../button/IconButton";
import DropdownInput from "./DropdownInput";

import Colors from "@/constants/color";
import { InputType } from "@/enum/InputType";
import { Zone } from "@/types/parking-lot/ParkingLot";
import { ZoneType } from "@/enum/ParkingLot";
import { formatEnumtoDropdownItem } from "@/utils/dropdown";

export type ParkingZoneInputProps = {
  value: Zone[];
  onChange: (zones?: Zone[]) => void;
};

const ParkingZoneInput: React.FC<ParkingZoneInputProps> = ({
  value,
  onChange,
}) => {
  const { control, getValues, setValue } = useForm<Zone[]>();
  const [zones, setZones] = useState<Zone[]>(
    value ?? [
      {
        name: "",
        type: ZoneType.NORMAL,
      },
    ]
    );

  useEffect(() => {
    if(value) {
      value.forEach((item, index) => {
        setValue(`${index}`,  item);
      })
    }
  }, [])

  useEffect(() => {
    const formData = getValues();
    const newZones: Zone[] = [];
    Object.values(formData).forEach((zone: Zone, index: number) => {
      if(index < zones.length) newZones.push(zone);
    });
    onChange(newZones);
  }, [zones]);

  return (
    <View>
      {zones.map((zone, index) => (
        <View style={styles.settingContainer} key={`zone_${index}`}>
          <View style={styles.sameLineInputContainer}>
            <Controller
              name={`${index}.name`}
              control={control}
              render={({ field: { onChange, value } }) => (
                <MyTextInput
                  title="Zone"
                  placeholder={"Zone"}
                  value={value}
                  onChangeText={onChange}
                  containerStyle={{ flex: 1 }}
                  isRequired
                  editable
                />
              )}
            />
            <Controller
              name={`${index}.capacity`}
              control={control}
              render={({ field: { onChange, value } }) => (
                <MyTextInput
                  title="Capacity"
                  placeholder={"Capacity"}
                  value={value ? value.toString() : ''}
                  onChangeText={(value) => onChange(parseInt(value))}
                  containerStyle={{ flex: 1 }}
                  inputMode={InputType.Numeric}
                  isRequired
                  editable
                />
              )}
            />
          </View>
          <Controller
            name={`${index}.type`}
            control={control}
            defaultValue={zone.type}
            render={({ field: { onChange, value } }) => (
              <DropdownInput
                title={"Parking zone type"}
                selectedValue={value}
                placeholder={"Select zone type"}
                onSelect={onChange}
                items={formatEnumtoDropdownItem(ZoneType)}
                isRequired
              />
            )}
          />
          {index !== 0 && (
            <IconButton
              icon={"close"}
              size={0}
              color={""}
              buttonStyle={styles.closeButton}
              onPress={() => {
                setZones([...zones.slice(0, index - 1), ...zones.slice(index)]);
              }}
            />
          )}
        </View>
      ))}
      <SecondaryButton
        title="+ Add more zone to this floor"
        buttonStyle={styles.addZoneButton}
        textStyle={{ color: Colors.black }}
        onPress={() => {
          setZones([
            ...zones,
            {
              name: "",
              type: ZoneType.NORMAL,
            },
          ]);
        }}
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
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: -195,
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
