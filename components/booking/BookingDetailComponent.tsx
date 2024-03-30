import { useNavigation } from "@react-navigation/native";
import { parseISO } from "date-fns";
import { useLayoutEffect, useState } from "react";
import { Alert, Platform, StyleSheet, View } from "react-native";

import Specification from "./Specification";
import Colors from "../../constants/color";
import PrimaryButton from "../button/PrimaryButton";
import DayInput from "../input/DayInput";
import DropdownInput from "../input/DropdownInput";
import TimeInput from "../input/TimeInput";

import { ActionMode } from "@/enum/ActionMode";
import { AuthenticatedStackParamListProps } from "@/types";
import {
  formatHumanReadableDateFromDateString,
  formatTime,
} from "@/utils/date";
import { formatDropdownFromLicensePlates } from "@/utils/dropdown";

export type BookingDetailComponentProps = {
  checkOutTime: string | null;
  setCheckOutTime: (value: string | null) => void;
  checkOutDate: string | null;
  setCheckOutDate: (value: string | null) => void;
  licensePlate: string;
  setLicensePlate: (value: string) => void;
  checkInDate: string | null;
  setCheckInDate: (value: string | null) => void;
  checkInTime: string | null;
  setCheckInTime: (value: string | null) => void;
  specification: string | undefined;
  setSpecification: (value: string | undefined) => void;
  closeSetting: () => void;
  disableDate: (date: Date) => boolean;
  getOpenCloseTime: (dateString: string) =>
    | {
        openTime: string | undefined;
        closeTime: string | undefined;
      }
    | undefined;
  licensePlateList?: string[];
};

const BookingDetailComponent: React.FC<BookingDetailComponentProps> = ({
  checkOutTime,
  setCheckOutTime,
  checkOutDate,
  setCheckOutDate,
  licensePlate,
  setLicensePlate,
  checkInDate,
  setCheckInDate,
  checkInTime,
  setCheckInTime,
  specification,
  setSpecification,
  closeSetting,
  disableDate,
  getOpenCloseTime,
  licensePlateList,
}) => {
  const navigation = useNavigation<AuthenticatedStackParamListProps>();
  const [isFirstUpdate, setIsFirstUpdate] = useState(true);
  const [minCheckInTime, setMinCheckInTime] = useState<Date>();
  const [maxCheckInTime, setMaxCheckInTime] = useState<Date>();
  const [minCheckOutTime, setMinCheckOutTime] = useState<Date>();
  const [maxCheckOutTime, setMaxCheckOutTime] = useState<Date>();
  const isCheckInDateNotNull = checkInDate != null;
  const isCheckOutTimeEditable = checkOutDate != null && checkInTime != null;
  const licensePlateDropdown =
    (licensePlateList && formatDropdownFromLicensePlates(licensePlateList)) ??
    [];

  const checkInTimeHandler = (checkInTime: string | null) => {
    if (checkInTime) {
      if (minCheckInTime && maxCheckInTime) {
        if (
          checkInTime < formatTime(minCheckInTime) ||
          checkInTime > formatTime(maxCheckInTime)
        ) {
          Alert.alert("Not in open Time");
          return;
        }
      }
    }
    setCheckInTime(checkInTime);
  };
  const checkOutTimeHandler = (checkOutTime: string | null) => {
    if (checkOutTime && checkInTime && checkInDate && checkOutDate) {
      if (minCheckOutTime && maxCheckOutTime) {
        if (
          checkOutTime < formatTime(minCheckOutTime) ||
          checkOutTime > formatTime(maxCheckOutTime)
        ) {
          Alert.alert("Not in open Time");
          return;
        }
      }
      if (
        checkInDate < checkOutDate ||
        (checkInDate == checkOutDate && checkInTime < checkOutTime)
      ) {
        setCheckOutTime(checkOutTime);
      } else {
        Alert.alert("Please select time after check in");
      }
    }
  };

  const setLicensePlateHandler = (value: string) => {
    if (value == "Not found your license plate") {
      setLicensePlate("");
      navigation.navigate("OtherStack", {
        screen: "CarInfoSetup",
        params: {
          mode: ActionMode.CREATE,
        },
      });
    } else {
      setLicensePlate(value);
    }
  };

  const setTimeConstraint = (
    date: string,
    setMinTime: (dateObj: Date | undefined) => void,
    setMaxTime: (dateObj: Date | undefined) => void
  ) => {
    const value = getOpenCloseTime(date);
    if (value) {
      const { openTime, closeTime } = value;
      const openTimeObject = openTime
        ? parseISO(`${date} ${openTime}`)
        : undefined;
      const closeTimeObject = closeTime
        ? parseISO(`${date} ${closeTime}`)
        : undefined;
      setMinTime(openTimeObject);
      setMaxTime(closeTimeObject);
    }
  };

  useLayoutEffect(() => {
    if (checkInDate)
      setTimeConstraint(checkInDate, setMinCheckInTime, setMaxCheckInTime);
  }, [checkInDate]);

  useLayoutEffect(() => {
    if (checkOutDate)
      setTimeConstraint(checkOutDate, setMinCheckOutTime, setMaxCheckOutTime);
  }, [checkOutDate]);

  useLayoutEffect(() => {
    if (!isFirstUpdate && checkInDate) {
      setCheckOutTime(null);
      setCheckOutDate(null);
      setCheckInTime(null);
    } else {
      setIsFirstUpdate(false);
    }
  }, [checkInDate]);

  useLayoutEffect(() => {
    if (
      (!isFirstUpdate && checkOutDate) ||
      (checkInTime && checkOutTime && checkInTime > checkOutTime)
    )
      setCheckOutTime(null);
  }, [checkOutDate, checkInTime]);

  const duration = (minTime: Date, maxTime: Date): string => {
    return `open ${formatTime(minTime)} - ${formatTime(maxTime)}`;
  };
  return (
    <View style={styles.outerContainer}>
      <DropdownInput
        selectedValue={licensePlate}
        placeholder={"ex.  กข1234"}
        onSelect={setLicensePlateHandler}
        items={[
          ...licensePlateDropdown,
          {
            label: "Not found your license plate",
            value: "Not found your license plate",
          },
        ]}
        title="License Plate"
        isRequired={true}
      />
      <View style={styles.dateTimeContainer}>
        <DayInput
          title={"Check-in"}
          date={checkInDate}
          displayDateFormatter={formatHumanReadableDateFromDateString}
          onChange={(value: string) => {
            setCheckInDate(value);
          }}
          setMinimumDate={true}
          outerContainerStyle={styles.dateContainer}
          editable={true}
          isRequired={true}
          disableDate={disableDate}
        />
        <TimeInput
          title={
            isCheckInDateNotNull
              ? minCheckInTime && maxCheckInTime
                ? duration(minCheckInTime, maxCheckInTime)
                : "open 24 hours"
              : ""
          }
          value={checkInTime}
          onTimeChange={checkInTimeHandler}
          outerContainerStyle={styles.timeContainer}
          editable={isCheckInDateNotNull}
          minTime={minCheckInTime}
          maxTime={maxCheckInTime}
        />
      </View>
      <View style={styles.dateTimeContainer}>
        <DayInput
          title={"Check-out"}
          date={checkOutDate}
          displayDateFormatter={formatHumanReadableDateFromDateString}
          onChange={(value: string) => {
            setCheckOutDate(value);
          }}
          setMinimumDate={true}
          outerContainerStyle={styles.dateContainer}
          editable={isCheckInDateNotNull}
          minDateValue={checkInDate}
          isRequired={true}
          disableDate={disableDate}
        />
        <TimeInput
          title={
            isCheckOutTimeEditable
              ? minCheckOutTime && maxCheckOutTime
                ? duration(minCheckOutTime, maxCheckOutTime)
                : "open 24 hours"
              : ""
          }
          value={checkOutTime}
          onTimeChange={checkOutTimeHandler}
          outerContainerStyle={styles.timeContainer}
          editable={isCheckOutTimeEditable}
          minTime={minCheckOutTime}
          maxTime={maxCheckOutTime}
        />
      </View>
      <Specification
        specification={specification}
        onChange={setSpecification}
      />
      <PrimaryButton
        title={"Done"}
        onPress={closeSetting}
        outerContainerStyle={styles.buttonContainer}
        buttonStyle={styles.button}
      />
    </View>
  );
};
export default BookingDetailComponent;

const styles = StyleSheet.create({
  outerContainer: {
    gap: Platform.OS == "ios" ? 20 : 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: Colors.white,
    elevation: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderRadius: 12,
  },
  dateTimeContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 10,
  },
  dateContainer: {
    flex: 1,
  },
  timeContainer: {
    flex: 1,
  },
  buttonContainer: {
    alignItems: "center",
  },
  button: {
    paddingHorizontal: 50,
  },
});
