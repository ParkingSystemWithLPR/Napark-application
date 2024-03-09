import { useNavigation } from "@react-navigation/native";
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
import { formatHumanReadableDateFromDateString } from "@/utils/date";

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
}) => {
  const navigation = useNavigation<AuthenticatedStackParamListProps>();
  const [isFirstUpdate, setIsFirstUpdate] = useState(true);
  const isCheckOutDateEditable = checkInTime != null && checkInDate != null;
  const isCheckOutTimeEditable = checkOutDate != null;

  const checkOutTimeHandler = (checkOutTime: string | null) => {
    if (checkOutTime && checkInTime && checkInDate && checkOutDate) {
      if (
        checkInDate < checkOutDate ||
        (checkInDate == checkOutDate && checkInTime < checkOutTime)
      ) {
        setCheckOutTime(checkOutTime);
      } else {
        Alert.alert("Please select later time");
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

  useLayoutEffect(() => {
    if (!isFirstUpdate && checkInDate != null && checkInDate != null) {
      setCheckOutTime(null);
      setCheckOutDate(null);
    } else {
      setIsFirstUpdate(false);
    }
  }, [checkInTime, checkInDate]);

  useLayoutEffect(() => {
    if (
      !isFirstUpdate &&
      checkOutDate &&
      checkInDate &&
      checkOutDate == checkInDate
    )
      setCheckOutTime(null);
  }, [checkOutDate]);

  return (
    <View style={styles.outerContainer}>
      <DropdownInput
        selectedValue={licensePlate}
        placeholder={"ex.  กข1234"}
        onSelect={setLicensePlateHandler}
        items={[
          { label: "กข1234", value: "กข1234" },
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
          shownDate={
            checkInDate && formatHumanReadableDateFromDateString(checkInDate)
          }
          onChange={(value: string) => {
            setCheckInDate(value);
          }}
          setMinimumDate={true}
          outerContainerStyle={styles.dateContainer}
          editable={true}
          isRequired={true}
        />
        <TimeInput
          title={""}
          value={checkInTime}
          onTimeChange={setCheckInTime}
          outerContainerStyle={styles.timeContainer}
          editable={true}
        />
      </View>
      <View style={styles.dateTimeContainer}>
        <DayInput
          title={"Check-out"}
          date={checkOutDate}
          shownDate={
            checkOutDate && formatHumanReadableDateFromDateString(checkOutDate)
          }
          onChange={(value: string) => {
            setCheckOutDate(value);
          }}
          setMinimumDate={true}
          outerContainerStyle={styles.dateContainer}
          editable={isCheckOutDateEditable}
          minDateValue={checkInDate}
          isRequired={true}
        />
        <TimeInput
          title={""}
          value={checkOutTime}
          onTimeChange={checkOutTimeHandler}
          outerContainerStyle={styles.timeContainer}
          editable={isCheckOutTimeEditable}
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
    flex: 3,
  },
  timeContainer: {
    flex: 2,
  },
  buttonContainer: {
    alignItems: "center",
  },
  button: {
    paddingHorizontal: 50,
  },
});
