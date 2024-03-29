import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import BodyText from "../text/BodyText";
import SubHeaderText from "../text/SubHeaderText";

import Colors from "@/constants/color";
import { formatTime } from "@/utils/date";

export type TimeInputProps = {
  title?: string;
  value: string | null;
  onTimeChange: (date: string) => void;
  placeholder?: string;
  editable?: boolean;
  outerContainerStyle?: object;
  containerStyle?: object;
  minTime?: Date;
  maxTime?: Date;
};

const TimeInput: React.FC<TimeInputProps> = ({
  title,
  value,
  placeholder = "Select Time",
  onTimeChange,
  editable = false,
  outerContainerStyle,
  containerStyle,
  minTime,
  maxTime,
}) => {
  const [isOpenTimePicker, setOpenTimePicker] = useState<boolean>(false);
  const openTimePicker = () => {
    editable && setOpenTimePicker(true);
  };

  const closeTimePicker = () => {
    setOpenTimePicker(false);
  };
  const timechangeHandler = (date: Date) => {
    onTimeChange(formatTime(date));
    closeTimePicker();
  };

  return (
    <View style={[outerContainerStyle]}>
      {title && <SubHeaderText text={title} />}
      <Pressable onPress={openTimePicker}>
        <View
          style={[
            styles.container,
            editable ? null : styles.uneditable,
            containerStyle,
          ]}
        >
          <BodyText
            text={value ?? placeholder}
            containerStyle={styles.dateTextContainer}
            textStyle={[
              styles.text,
              !editable && styles.uneditableText,
              !value && styles.placeholderText,
            ]}
          />
          <MaterialCommunityIcons name="clock-outline" />
        </View>
      </Pressable>
      <DateTimePicker
        isVisible={isOpenTimePicker}
        mode="time"
        onConfirm={timechangeHandler}
        onCancel={closeTimePicker}
        date={minTime ?? new Date()}
        minimumDate={minTime}
        maximumDate={maxTime}
      />
    </View>
  );
};

export default TimeInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 5,
    borderRadius: 8,
    padding: 16,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    backgroundColor: Colors.white,
    elevation: 4,
    marginVertical: 4,
  },
  text: {
    fontSize: 14,
  },
  placeholderText: {
    color: Colors.gray[600],
  },
  dateTextContainer: {},
  uneditable: {
    borderColor: Colors.gray[400],
    backgroundColor: Colors.gray[200],
  },
  uneditableText: {
    color: Colors.gray[800],
  },
  centeredContent: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  dateTimePickerContainer: {
    backgroundColor: "white",
    margin: 20,
    borderRadius: 10,
    padding: 20,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
});
