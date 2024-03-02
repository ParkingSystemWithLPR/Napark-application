import { StyleSheet, View } from "react-native";

import Specification from "./Specification";
import Colors from "../../constants/color";
import PrimaryButton from "../button/PrimaryButton";
import DayInput from "../input/DayInput";
import DropdownInput from "../input/DropdownInput";
import TimeInput from "../input/TimeInput";

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
  return (
    <View style={styles.outerContainer}>
      <DropdownInput
        selectedValue={licensePlate}
        placeholder={"ex.  กข1234"}
        onSelect={setLicensePlate}
        items={[{ label: "กข1234", value: "กข1234" }]}
        title="License Plate"
        isRequired={true}
      ></DropdownInput>
      <View style={styles.dateTimeContainer}>
        <DayInput
          title={"Check-in"}
          date={checkInDate}
          onChange={(value: string) => {
            setCheckInDate(value);
          }}
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
          onChange={(value: string) => {
            setCheckOutDate(value);
          }}
          outerContainerStyle={styles.dateContainer}
          editable={true}
          isRequired={true}
        />
        <TimeInput
          title={""}
          value={checkOutTime}
          onTimeChange={setCheckOutTime}
          outerContainerStyle={styles.timeContainer}
          editable={true}
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
    gap: 10,
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
