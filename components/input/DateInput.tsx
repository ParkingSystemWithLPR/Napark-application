import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, StyleSheet, View } from "react-native";

import TimeInput from "./TimeInput";
import Colors from "../../constants/color";
import IconButton from "../button/IconButton";
import BodyText from "../text/BodyText";
import SubHeaderText from "../text/SubHeaderText";

import { DayInAWeek } from "@/enum/DayInAWeek";
import { BusinessDay } from "@/types/parking-lot/ParkingLot";

export type DateInputProps = {
  title: string;
  businessDays: BusinessDay[];
  onChange: (businessDays: BusinessDay[]) => void;
};

const DateInput: React.FC<DateInputProps> = ({
  title,
  businessDays,
  onChange,
}) => {
  const { control, getValues } = useForm({ defaultValues: businessDays });

  const selectableDay = [
    DayInAWeek.SUNDAY,
    DayInAWeek.MONDAY,
    DayInAWeek.TUESDAY,
    DayInAWeek.WEDNESDAY,
    DayInAWeek.THURSDAY,
    DayInAWeek.FRIDAY,
    DayInAWeek.SATURDAY,
  ];

  const [businessDay, setBusinessDay] = useState<BusinessDay[]>(
    businessDays ?? [{}]
  );

  const onInputChange = () => {
    const businessDays = getValues();
    const newBusinessDays: BusinessDay[] = []; 
    Object.values(businessDays).forEach((businessDay : BusinessDay) => {
      newBusinessDays.push(businessDay);
    })
    onChange(newBusinessDays);
  }

  const renderDaySelector = (day: DayInAWeek, index: number) => {
    return (
      <Controller
        name={`${index}.days`}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Pressable
            android_ripple={{ color: Colors.gray[600] }}
            style={({ pressed }) => [
              value && value.includes(day) ? styles.selected : styles.idle,
              pressed ? styles.buttonPressed : null,
            ]}
            onPress={() => {
              value
                ? value.includes(day)
                  ? onChange(value.filter((d: DayInAWeek) => d !== day))
                  : onChange([...value, day])
                : onChange([day]);
              onInputChange();
            }}
          >
            <BodyText
              text={day.slice(0, 2)}
              textStyle={
                value && value.includes(day) ? styles.textSelected : {}
              }
            />
          </Pressable>
        )}
      />
    );
  };

  const renderDayWithTimeSelector = (index: number) => {
    return (
      <View style={styles.outerContainer} key={index}>
        <View style={styles.title}>
          <SubHeaderText text={title} />
          {index !== 0 &&
            <IconButton
              icon={"minus"}
              size={10}
              color={Colors.gray[900]}
              buttonStyle={styles.closeButton}
              onPress={() => {
                setBusinessDay([...businessDay.slice(0, index), ...businessDay.slice(index+1)]);
              }}
            />
          }
        </View>
        <View style={styles.container}>
          {selectableDay.map((day) => renderDaySelector(day, index))}
        </View>
        <View style={styles.sameLineInputContainer}>
          <Controller
            name={`${index}.businessHours.openTime`}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TimeInput
                title={"Open time"}
                value={value}
                onTimeChange={(value) => {
                  onChange(value);
                  onInputChange();
                }}
                outerContainerStyle={{ flex: 1 }}
                editable
              />
            )}
          />
          <BodyText text={"to"} textStyle={{ color: Colors.gray[700] }} />
          <Controller
            name={`${index}.businessHours.closeTime`}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TimeInput
                title={"Close time"}
                value={value}
                onTimeChange={(value) => {
                  onChange(value);
                  onInputChange();
                }}
                outerContainerStyle={{ flex: 1 }}
                editable
              />
            )}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.outerContainer}>
      {businessDay.map((_, index) => renderDayWithTimeSelector(index))}
      <IconButton
        icon={"plus"}
        size={20}
        color={Colors.gray[900]}
        buttonStyle={styles.addButton}
        onPress={() => {
          setBusinessDay([...businessDay, {}]);
        }}
      />
    </View>
  );
};

export default DateInput;

const styles = StyleSheet.create({
  outerContainer: {
    gap: 10,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  idle: {
    borderRadius: 100,
    backgroundColor: Colors.white,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
  },
  selected: {
    borderRadius: 100,
    backgroundColor: Colors.red[400],
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
  },
  textSelected: {
    color: Colors.white,
  },
  sameLineInputContainer: {
    gap: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: -10,
  },
  button: {},
  buttonPressed: {
    opacity: 0.5,
  },
  addButton: {
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
    width: 33,
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
  }
});
