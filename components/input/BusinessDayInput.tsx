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
import { formatToSentenceCase } from "@/utils/text";

export type DateInputProps = {
  title: string;
  businessDays: BusinessDay[];
  onChange: (businessDays: BusinessDay[]) => void;
  errorText: string;
  isRequired: boolean;
};

const DateInput: React.FC<DateInputProps> = ({
  title,
  businessDays,
  onChange,
  errorText,
  isRequired,
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

  const [formList, setFormList] = useState<number[]>([0]);
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
    return a.open_time === b.open_time && a.close_time === b.close_time;
  };

  useEffect(() => {
    if (businessDays) {
      const newSelectedDay = selectedDay;
      const businessHoursSet: BusinessHour[] = [];
      const newFormList: number[] = [];
      businessDays.forEach((businessDay) => {
        const { weekday, close_time, open_time } = businessDay;
        if (
          !businessHoursSet.some((e) =>
            isEqualBusinessHour(e, { close_time, open_time })
          )
        ) {
          businessHoursSet.push({ close_time, open_time });
          newFormList.push(0);
        }
        const index = businessHoursSet.findIndex((e) =>
          isEqualBusinessHour(e, { close_time, open_time })
        );
        newSelectedDay[weekday as DayInAWeek] = {
          set: index,
          isSelected: true,
        };
        setValue(`${index}`, { close_time, open_time });
      });
      setSelectedDay(newSelectedDay);
      setFormList(newFormList);
    }
  }, []);

  const onInputChange = () => {
    const formData = getValues();
    const newBusinessDays: BusinessDay[] = [];
    Object.entries(selectedDay).forEach(([day, value]) => {
      if (value.isSelected) {
        const { open_time, close_time } = formData[value.set ?? -2];
        const newDay = day as DayInAWeek;
        newBusinessDays.push({
          weekday: newDay,
          open_time: open_time + ":00",
          close_time: close_time + ":00",
        });
      }
    });

    onChange(newBusinessDays);
  };

  const onRemoveFormList = () => {
    setFormList([...formList.slice(0, -1)]);
    const newSelectedDay = selectedDay;
    Object.entries(selectedDay).forEach(([day, { set }]) => {
      if (set === formList.length - 1) {
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
          text={formatToSentenceCase(day.slice(0, 2))}
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
        <View style={styles.titleContainer}>
          <SubHeaderText text={title} />
          {isRequired && (
            <BodyText text="*" textStyle={styles.requiredIndicator} />
          )}
        </View>
        <View style={styles.container}>
          {selectableDay.map((day) => renderDaySelector(day, index))}
        </View>
        {errorText && (
          <BodyText text={errorText} textStyle={styles.errorText} />
        )}
        <View style={styles.sameLineInputContainer}>
          <Controller
            name={`${index}.open_time`}
            control={control}
            rules={{ required: "Please select open time" }}
            defaultValue={"08:00"}
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
            name={`${index}.close_time`}
            control={control}
            rules={{ required: "Please select close time" }}
            defaultValue={"20:00"}
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
      {formList.map((_, index) => renderDayWithTimeSelector(index))}
      <View style={styles.buttonContainer}>
        <IconButton
          icon={"plus"}
          size={20}
          color={Colors.gray[900]}
          buttonStyle={styles.adjustFormListButton}
          onPress={() => {
            setFormList([...formList, 0]);
          }}
        />
        <IconButton
          icon={"minus"}
          size={20}
          color={Colors.gray[900]}
          buttonStyle={
            formList.length === 1
              ? styles.diabledButton
              : styles.adjustFormListButton
          }
          onPress={() => {
            onRemoveFormList();
          }}
          disabled={formList.length === 1}
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
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  requiredIndicator: {
    color: Colors.red[400],
  },
  errorText: {
    color: Colors.red[400],
    fontSize: 12,
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
  adjustFormListButton: {
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
