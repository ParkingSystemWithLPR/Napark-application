import React, { useState } from "react";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DatePicker from "react-native-modern-datepicker";

import Colors from "../../constants/color";
import SubHeaderText from "../text/SubHeaderText";
import BodyText from "../text/BodyText";
import ModalOverlay from "../ui/ModalOverlay";
import { formatDate, formatStringDate } from "../../utils/date";

export type DayInputProps = {
  title: string;
  date: string | null;
  placeholder?: string;
  onChange: (date: string) => void;
  setMinimumDate?: boolean;
  editable?: boolean;
  outerContainerStyle?: object;
  containerStyle?: object;
};

const DayInput: React.FC<DayInputProps> = ({
  title,
  date,
  onChange,
  placeholder = "YYYY-MM-DD",
  setMinimumDate = false,
  editable = false,
  outerContainerStyle,
  containerStyle,
}) => {
  const startDate = formatDate(new Date());
  const [isOpenDayPicker, setOpenDayPicker] = useState<boolean>(false);

  const openDayPicker = () => {
    if (editable) setOpenDayPicker(true);
  };

  const closeDayPicker = () => {
    setOpenDayPicker(false);
  };

  const handleOnSelectedChange = (selected: string) => {
    onChange(formatStringDate(selected));
    closeDayPicker();
  };

  return (
    <View style={[styles.outerContainer, outerContainerStyle]}>
      <SubHeaderText text={title} />
      <Pressable onPress={openDayPicker} disabled={!editable}>
        <View
          style={[
            styles.container,
            !editable && styles.uneditable,
            containerStyle,
          ]}
        >
          <BodyText
            text={date ? date : placeholder}
            containerStyle={styles.dateTextContainer}
            textStyle={[
              styles.text,
              !editable && styles.uneditableText,
              !date && styles.placeholderText,
            ]}
          />
          <MaterialCommunityIcons
            name="calendar-month-outline"
            color={!editable ? Colors.gray[800] : undefined}
          />
        </View>
      </Pressable>
      <ModalOverlay visible={isOpenDayPicker} closeModal={closeDayPicker}>
        <View style={styles.centeredContent}>
          <View style={styles.dateTimePickerContainer}>
            <DatePicker
              mode="calendar"
              minimumDate={setMinimumDate ? startDate : undefined}
              selected={date ?? startDate}
              onDateChange={handleOnSelectedChange}
            />
          </View>
        </View>
      </ModalOverlay>
    </View>
  );
};

export default DayInput;

const styles = StyleSheet.create({
  outerContainer: {},
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 5,
    borderWidth: 1,
    borderColor: Colors.gray[800],
    borderRadius: 8,
    padding: 8,
  },
  text: {
    fontSize: 12,
  },
  placeholderText: {
    color: Platform.OS == "android" ? Colors.gray[800] : Colors.gray[600],
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
