import { useNavigation } from "@react-navigation/native";
import { isEqual, max } from "date-fns";
import { useLayoutEffect, useState } from "react";
import { Alert, Platform, StyleSheet, View } from "react-native";

import Specification from "./Specification";
import Colors from "../../constants/color";
import PrimaryButton from "../button/PrimaryButton";
import DayInput from "../input/DayInput";
import DropdownInput from "../input/DropdownInput";
import TimeInput from "../input/TimeInput";

import { ActionMode } from "@/enum/ActionMode";
import { BookingDetailState } from "@/screens/bookings/booking/BookingDetail";
import { useProfile } from "@/store/context/profile";
import { AuthenticatedStackParamListProps } from "@/types";
import { BusinessDay, ParkingLot } from "@/types/parking-lot";
import {
  disableDate,
  duration,
  formatHumanReadableDateFromDateString,
  formatTime,
  getDateFromDateAndTime,
  getOpenCloseTime,
  isCheckInTimeout,
  isCheckOutTimeout,
} from "@/utils/date";
import { formatDropdownFromLicensePlates } from "@/utils/dropdown";

export type BookingDetailComponentProps = {
  bookingDetailState: BookingDetailState;
  onChange: <T>(identifierKey: string, enteredValue: T) => void;
  closeSetting: () => void;
  parkingLot: ParkingLot;
};

const BookingDetailComponent: React.FC<BookingDetailComponentProps> = ({
  bookingDetailState,
  onChange,
  closeSetting,
  parkingLot,
}) => {
  const {
    checkOutTime,
    checkOutDate,
    carId,
    checkInDate,
    checkInTime,
    specification,
  } = bookingDetailState;
  const { business_days } = parkingLot;
  const navigation = useNavigation<AuthenticatedStackParamListProps>();
  const { profile } = useProfile();
  const [isFirstUpdate, setIsFirstUpdate] = useState(true);
  const [minCheckInTime, setMinCheckInTime] = useState<Date>();
  const [maxCheckInTime, setMaxCheckInTime] = useState<Date>();
  const [minCheckOutTime, setMinCheckOutTime] = useState<Date>();
  const [maxCheckOutTime, setMaxCheckOutTime] = useState<Date>();
  const [displayCheckInTime, setDisplayCheckInTime] = useState<string>();
  const [displayCheckOutTime, setDisplayCheckOutTime] = useState<string>();

  const setCheckOutTime = (value: string | null) => {
    onChange("checkOutTime", value);
  };

  const setCheckOutDate = (value: string | null) => {
    onChange("checkOutDate", value);
  };

  const setLicensePlate = (value: string) => {
    onChange("carId", value);
  };

  const setCheckInDate = (value: string | null) => {
    onChange("checkInDate", value);
    onChange("checkOutDate", value); //for this version where only booking in same day
  };

  const setCheckInTime = (value: string | null) => {
    onChange("checkInTime", value);
  };

  const setSpecification = (value?: string) => {
    onChange("specification", value);
  };

  const isCheckInDateNotNull = checkInDate != null;

  const isCheckInTimeEditable =
    isCheckInDateNotNull &&
    (!minCheckInTime ||
      !maxCheckInTime ||
      !isEqual(minCheckInTime, maxCheckInTime));

  const isCheckOutTimeEditable =
    checkOutDate != null &&
    checkInTime != null &&
    (!minCheckOutTime ||
      !maxCheckOutTime ||
      !isEqual(minCheckOutTime, maxCheckOutTime));

  const licensePlateList = profile.cars;
  const licensePlateDropdown =
    (licensePlateList && formatDropdownFromLicensePlates(licensePlateList)) ??
    [];

  const disableDateHandler =
    business_days && disableDate.bind(this, business_days);

  const checkInTimeHandler = (checkInTime: string | null) => {
    if (checkInTime && checkInDate) {
      if (minCheckInTime && maxCheckInTime) {
        if (
          checkInTime < formatTime(minCheckInTime) ||
          checkInTime > formatTime(maxCheckInTime) ||
          isCheckInTimeout(getDateFromDateAndTime(checkInDate, checkInTime))
        ) {
          Alert.alert("Not Valid Time");
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
          checkOutTime > formatTime(maxCheckOutTime) ||
          isCheckOutTimeout(getDateFromDateAndTime(checkOutDate, checkOutTime))
        ) {
          Alert.alert("Not Valid Time");
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
    setMinTime: (dateObj?: Date) => void,
    setMaxTime: (dateObj?: Date) => void,
    setDisplay: (displayString?: string) => void
  ) => {
    const now = new Date();
    const value = business_days && getOpenCloseTime(date, business_days);
    if (value) {
      const { open_time, close_time } = value;
      const openTimeObject = open_time
        ? getDateFromDateAndTime(date, open_time)
        : undefined;
      const closeTimeObject = close_time
        ? getDateFromDateAndTime(date, close_time)
        : undefined;
      setMinTime(openTimeObject && max([openTimeObject, now]));
      setMaxTime(closeTimeObject && max([closeTimeObject, now]));
      setDisplay(
        openTimeObject &&
          closeTimeObject &&
          duration(openTimeObject, closeTimeObject)
      );
    }
  };

  useLayoutEffect(() => {
    if (checkInDate)
      setTimeConstraint(
        checkInDate,
        setMinCheckInTime,
        setMaxCheckInTime,
        setDisplayCheckInTime
      );
  }, [checkInDate]);

  useLayoutEffect(() => {
    if (checkOutDate)
      setTimeConstraint(
        checkOutDate,
        setMinCheckOutTime,
        setMaxCheckOutTime,
        setDisplayCheckOutTime
      );
  }, [checkOutDate]);

  useLayoutEffect(() => {
    if (!isFirstUpdate && checkInDate) {
      setCheckOutTime(null);
      // setCheckOutDate(null);
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

  return (
    <View style={styles.outerContainer}>
      <DropdownInput
        selectedValue={carId}
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
          disableDate={disableDateHandler}
        />
        <TimeInput
          title={isCheckInDateNotNull ? displayCheckInTime : ""}
          value={checkInTime}
          onTimeChange={checkInTimeHandler}
          outerContainerStyle={styles.timeContainer}
          editable={isCheckInTimeEditable}
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
          editable={false} //{isCheckInTimeEditable} for first version that only booking in same day
          minDateValue={checkInDate}
          isRequired={true}
          disableDate={disableDateHandler}
        />
        <TimeInput
          title={isCheckOutTimeEditable ? displayCheckOutTime : ""}
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
        title={"Next"}
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
