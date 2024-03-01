import { View, StyleSheet } from "react-native";

import Colors from "../../constants/color";
import BodyText from "../text/BodyText";
import HeaderText from "../text/HeaderText";
import SubHeaderText from "../text/SubHeaderText";

interface activeTimeSlotProps {
  licensePlate: string,
  space: string,
  timeRemaining: string
}

const ActiveTimeSlot: React.FC<activeTimeSlotProps> = ({ licensePlate, space, timeRemaining }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.topContainer}>
        <HeaderText
          text={licensePlate}
          textStyle={{ color: Colors.black }}
        />
        <BodyText text="Space 4c" textStyle={{ color: Colors.gray[900] }} />
      </View>
      <View style={styles.bottomContainer}>
        <SubHeaderText
          text={space}
          textStyle={{ color: Colors.gray[900] }}
        />
        <SubHeaderText
          text={timeRemaining}
          textStyle={{ color: Colors.gray[900] }}
        />
      </View>
    </View>
  );
};

export default ActiveTimeSlot;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    marginTop: 20,
    height: "auto",
    backgroundColor: Colors.white,
    borderRadius: 8,
    shadowColor: Colors.black,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  topContainer: {
    paddingVertical: 5,
    borderBottomColor: Colors.gray[700],
    borderBottomWidth: 1,
    flexDirection: "column",
    alignItems: "flex-end",
  },
  bottomContainer: {
    paddingTop: 5,
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
