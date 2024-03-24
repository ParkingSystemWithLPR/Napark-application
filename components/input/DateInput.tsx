import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, StyleSheet, View } from "react-native";

import TimeInput from "./TimeInput";
import Colors from "../../constants/color";
import IconButton from "../button/IconButton";
import BodyText from "../text/BodyText";
import SubHeaderText from "../text/SubHeaderText";

import { DayInAWeek } from "@/enum/DayInAWeek";
import { BusinessDay, BusinessHour } from "@/types/parking-lot/ParkingLot";

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
  const { control, getValues, setValue } = useForm();

  const selectableDay = [
    DayInAWeek.SUNDAY,
    DayInAWeek.MONDAY,
    DayInAWeek.TUESDAY,
    DayInAWeek.WEDNESDAY,
    DayInAWeek.THURSDAY,
    DayInAWeek.FRIDAY,
    DayInAWeek.SATURDAY,
  ];

  const [formSet, setFormSet] = useState<number[]>([0]);
  const [selectedDay, setSelectedDay] = useState<{
    [day in DayInAWeek]: { set?: number; isSelected: boolean };
  }>({
    [DayInAWeek.SUNDAY]: { isSelected: false },
    [DayInAWeek.MONDAY]: { isSelected: false },
    [DayInAWeek.TUESDAY]: { isSelected: false },
    [DayInAWeek.WEDNESDAY]: { isSelected: false },
    [DayInAWeek.THURSDAY]: { isSelected: false },
    [DayInAWeek.FRIDAY]: { isSelected: false },
    [DayInAWeek.SATURDAY]: { isSelected: false },
  });

  const isEqualBusinessHour = (a: BusinessHour, b: BusinessHour) => {
    return a.openTime === b.openTime && a.closeTime === b.closeTime;
  };

  useEffect(() => {
    if (businessDays) {
      let index = 0;
      const newSelectedDay = selectedDay;
      const businessHoursSet: BusinessHour[] = [];
      const newFormSet: number[] = [];
      Object.entries(businessDays).forEach(([day, value]) => {
        if (!businessHoursSet.some((e) => isEqualBusinessHour(e, value))) {
          businessHoursSet.push(value);
          newFormSet.push(0);
        }
        index = businessHoursSet.findIndex((e) =>
          isEqualBusinessHour(e, value)
        );
        newSelectedDay[day as DayInAWeek] = { set: index, isSelected: true };
        setValue(`${index}`, value);
      });
      setSelectedDay(newSelectedDay);
      setFormSet(newFormSet);
    }
  }, []);

  const onInputChange = () => {
    const formData = getValues();
    const newBusinessDays: BusinessDay = {};
    Object.entries(selectedDay).forEach(([day, value]) => {
      if (value.isSelected) {
        const { openTime, closeTime } = formData[value.set ?? -2];
        newBusinessDays[day as DayInAWeek] = { openTime, closeTime };
      }
    });

    onChange(newBusinessDays);
  };

  const onRemoveFormSet = () => {
    setFormSet([...formSet.slice(0, -1)]);
    const newSelectedDay = selectedDay;
    Object.entries(selectedDay).forEach(([day, { set }]) => {
      if (set === formSet.length - 1) {
        newSelectedDay[day as DayInAWeek] = { isSelected: false };
      }
    });
    setSelectedDay(newSelectedDay);
    onInputChange();
  };

  const renderDaySelector = (day: DayInAWeek, index: number) => {
    return (
      <Pressable
        key={`${day}${index}`}
        android_ripple={{ color: Colors.gray[600] }}
        style={({ pressed }) => [
          selectedDay[day].isSelected && selectedDay[day].set === index
            ? styles.selected
            : styles.idle,
          pressed ? styles.buttonPressed : null,
        ]}
        onPress={() => {
          setSelectedDay({
            ...selectedDay,
            [day]: {
              set: index,
              isSelected: selectedDay[day].isSelected
                ? !(selectedDay[day].set === index)
                : true,
            },
          });
          onInputChange();
        }}
      >
        <BodyText
          text={day.slice(0, 2)}
          textStyle={
            selectedDay[day].isSelected && selectedDay[day].set === index
              ? styles.textSelected
              : {}
          }
        />
      </Pressable>
    );
  };

  const renderDayWithTimeSelector = (index: number) => {
    return (
      <View style={styles.outerContainer} key={index}>
        <View style={styles.title}>
          <SubHeaderText text={title} />
        </View>
        <View style={styles.container}>
          {selectableDay.map((day) => renderDaySelector(day, index))}
        </View>
        <View style={styles.sameLineInputContainer}>
          <Controller
            name={`${index}.openTime`}
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
            name={`${index}.closeTime`}
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
      {formSet.map((_, index) => renderDayWithTimeSelector(index))}
      <View style={styles.buttonContainer}>
        <IconButton
          icon={"plus"}
          size={20}
          color={Colors.gray[900]}
          buttonStyle={styles.adjustFormSetButton}
          onPress={() => {
            setFormSet([...formSet, 0]);
          }}
        />
        <IconButton
          icon={"minus"}
          size={20}
          color={Colors.gray[900]}
          buttonStyle={
            formSet.length === 1
              ? styles.diabledButton
              : styles.adjustFormSetButton
          }
          onPress={() => {
            onRemoveFormSet();
          }}
          disabled={formSet.length === 1}
        />
      </View>
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: -10,
  },
  adjustFormSetButton: {
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
  diabledButton: {
    backgroundColor: Colors.gray[200],
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
