import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import BodyText from "../text/BodyText";
import SubHeaderText from "../text/SubHeaderText";
import ModalOverlay from "../ui/ModalOverlay";

import Colors from "@/constants/color";
import { MINIMUM_DATE, formatDate } from "@/utils/date";

export type DayInputProps = {
  title: string;
  date: string | null;
  displayDateFormatter?: (date: string) => string;
  placeholder?: string;
  onChange: (date: string) => void;
  isRequired?: boolean;
  setMinimumDate?: boolean;
  minDateValue?: string | null;
  disableDate?: (date: Date) => boolean;
  editable?: boolean;
  outerContainerStyle?: object;
  containerStyle?: object;
  errorText?: string;
};

const DayInput: React.FC<DayInputProps> = ({
  title,
  date,
  displayDateFormatter,
  onChange,
  isRequired = false,
  placeholder = "YYYY-MM-DD",
  setMinimumDate = false,
  minDateValue = null,
  disableDate,
  editable = false,
  outerContainerStyle,
  containerStyle,
  errorText,
}) => {
  const minimumDate = MINIMUM_DATE;
  const startDate = new Date();
  const [isOpenDayPicker, setOpenDayPicker] = useState<boolean>(false);

  const openDayPicker = () => {
    if (editable) setOpenDayPicker(true);
  };

  const closeDayPicker = () => {
    setOpenDayPicker(false);
  };

  const handleOnSelectedChange = (selected: Date) => {
    onChange(formatDate(selected));
    closeDayPicker();
  };

  return (
    <View style={[styles.outerContainer, outerContainerStyle]}>
      <View style={styles.titleContainer}>
        <SubHeaderText text={title} />
        {isRequired && (
          <BodyText text="*" textStyle={styles.requiredIndicator} />
        )}
      </View>
      <Pressable onPress={openDayPicker} disabled={!editable}>
        <View
          style={[
            styles.container,
            !editable && styles.uneditable,
            containerStyle,
          ]}
        >
          <BodyText
            text={
              date
                ? displayDateFormatter
                  ? displayDateFormatter(date)
                  : date
                : placeholder
            }
            containerStyle={styles.dateTextContainer}
            textStyle={[
              styles.text,
              !editable && styles.uneditableText,
              !date && styles.placeholderText,
            ]}
          />
          <MaterialCommunityIcons
            name="calendar-month-outline"
            size={14}
            color={!editable ? Colors.gray[800] : undefined}
          />
        </View>
      </Pressable>
      <ModalOverlay visible={isOpenDayPicker} closeModal={closeDayPicker}>
        <View style={styles.centeredContent}>
          <TouchableWithoutFeedback>
            <View style={styles.dateTimePickerContainer}>
              <CalendarPicker
                onDateChange={handleOnSelectedChange}
                minDate={
                  setMinimumDate
                    ? minDateValue
                      ? minDateValue
                      : startDate
                    : minimumDate
                }
                disabledDates={disableDate}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </ModalOverlay>
      {errorText && <BodyText text={errorText} textStyle={styles.errorText} />}
    </View>
  );
};

export default DayInput;

const styles = StyleSheet.create({
  outerContainer: {},
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
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
  requiredIndicator: {
    color: Colors.red[400],
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
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  dateTimePickerContainer: {
    backgroundColor: "white",
    margin: 20,
    borderRadius: 10,
    padding: 20,
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
  errorText: {
    color: Colors.red[400],
    fontSize: 12,
  },
});
