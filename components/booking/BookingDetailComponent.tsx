import { StyleSheet, View } from "react-native";

import CustomLabel from "./BookingSliderLabel";
import Specification from "./Specification";
import Colors from "../../constants/color";
import PrimaryButton from "../button/PrimaryButton";
import DayInput from "../input/DayInput";
import DropdownInput from "../input/DropdownInput";
import SliderInput from "../input/SliderInput";
import TimeInput from "../input/TimeInput";

export type BookingDetailComponentProps = {
  duration: number[];
  setDuration: (value: number[]) => void;
  licensePlate: string;
  setLicensePlate: (value: string) => void;
  date: string | null;
  setDate: (value: string | null) => void;
  time: string | null;
  setTime: (value: string | null) => void;
  selectedId: string | undefined;
  setSelectedId: (value: string | undefined) => void;
  closeSetting: () => void;
};

const BookingDetailComponent: React.FC<BookingDetailComponentProps> = ({
  duration,
  setDuration,
  licensePlate,
  setLicensePlate,
  date,
  setDate,
  time,
  setTime,
  selectedId,
  setSelectedId,
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
          date={date}
          onChange={setDate}
          outerContainerStyle={styles.dateContainer}
          editable={true}
          isRequired={true}
        />
        <TimeInput
          title={""}
          value={time}
          onTimeChange={setTime}
          outerContainerStyle={styles.timeContainer}
          editable={true}
        />
      </View>
      <SliderInput
        min={0.5}
        max={8.5}
        value={duration}
        step={0.5}
        onValuesChange={setDuration}
        customLabel={CustomLabel}
        title="Estimate Duration"
        isRequired={true}
      ></SliderInput>
      <Specification selectedId={selectedId} onChange={setSelectedId} />
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
