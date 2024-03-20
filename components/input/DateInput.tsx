import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, StyleSheet, View } from "react-native";

import CheckboxInput from "./CheckBoxInput";
import TimeInput from "./TimeInput";
import Colors from "../../constants/color";
import BodyText from "../text/BodyText";
import SubHeaderText from "../text/SubHeaderText";

import { DayInAWeek } from "@/enum/DayInAWeek";
import { BusinessDay } from "@/types/parking-lot/ParkingLot";

export type DateInputProps = {
  title: string;
  businessDays: BusinessDay;
  onChange: (businessDays: BusinessDay) => void;
};

const DateInput: React.FC<DateInputProps> = ({
  title,
  businessDays,
  onChange,
}) => {
  const { control, getValues } = useForm();

  const selectableDay = [
    DayInAWeek.SUNDAY,
    DayInAWeek.MONDAY,
    DayInAWeek.TUESDAY,
    DayInAWeek.WEDNESDAY,
    DayInAWeek.THURSDAY,
    DayInAWeek.FRIDAY,
    DayInAWeek.SATURDAY,
  ];

  const [ businessDay, setBusinessDay ] = useState<BusinessDay>(businessDays ?? {
    [DayInAWeek.MONDAY]: {isOpen: false},
    [DayInAWeek.TUESDAY]: {isOpen: false},
    [DayInAWeek.WEDNESDAY]: {isOpen: false},
    [DayInAWeek.THURSDAY]: {isOpen: false},
    [DayInAWeek.FRIDAY]: {isOpen: false},
    [DayInAWeek.SATURDAY]: {isOpen: false},
    [DayInAWeek.SUNDAY]: {isOpen: false},
  });

  const [isApplyAll, setApplyAll] = useState<boolean>(true);
  useEffect(() => {
    onChange(businessDay);
  }, [businessDay])

  const onSelectDayHandler = (day: DayInAWeek) => {
    if (businessDay[day].isOpen) {
      setBusinessDay({...businessDay, [day]: { isOpen: false }});
    } else {
      if (isApplyAll) {
        const { openTime, closeTime } = getValues();
        setBusinessDay({...businessDay, [day]: { isOpen: true, openTime, closeTime }})
      }
    }
  };

  const onTimeChange = () => {
    if (isApplyAll) {
      const { openTime, closeTime } = getValues();
      const newBusinessDay = businessDay;
      Object.keys(businessDay).forEach((day) => {
        if (businessDay[day as DayInAWeek].isOpen) {
          newBusinessDay[day as DayInAWeek] = {
            isOpen: true,
            openTime,
            closeTime,
          };
        }
      });
      setBusinessDay(newBusinessDay);
    }
  };

  const renderDaySelector = (day: DayInAWeek) => {
    return (
      <Pressable
        key={day}
        android_ripple={{ color: Colors.gray[600] }}
        style={({ pressed }) => [
          businessDay[day].isOpen ? styles.selected : styles.idle,
          pressed ? styles.buttonPressed : null,
        ]}
        onPress={() => onSelectDayHandler(day)}
      >
        <BodyText
          text={day.slice(0, 2)}
          textStyle={businessDay[day].isOpen ? styles.textSelected : {}}
        />
      </Pressable>
    );
  };

  return (
    <View style={styles.outerContainer}>
      <SubHeaderText text={title} />
      <View style={styles.container}>
        {selectableDay.map((day) => renderDaySelector(day))}
      </View>
      <View style={styles.sameLineInputContainer}>
        <Controller
          name={"openTime"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TimeInput
              title={"Open time"}
              value={value}
              onTimeChange={(value) => {
                onChange(value);
                onTimeChange();
              }}
              outerContainerStyle={{ flex: 1 }}
              editable
            />
          )}
        />
        <BodyText text={"to"} textStyle={{ color: Colors.gray[700] }} />
        <Controller
          name={"closeTime"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TimeInput
              title={"Close time"}
              value={value}
              onTimeChange={(value) => {
                onChange(value);
                onTimeChange();
              }}
              outerContainerStyle={{ flex: 1 }}
              editable
            />
          )}
        />
      </View>
      <CheckboxInput
        text={"Apply all"}
        onPress={() => setApplyAll(!isApplyAll)}
        isChecked={isApplyAll}
      />
    </View>
  );
};

export default DateInput;

const styles = StyleSheet.create({
  outerContainer: {
    gap: 10,
    marginBottom: 10,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  },
  button: {},
  buttonPressed: {
    opacity: 0.5,
  },
});
