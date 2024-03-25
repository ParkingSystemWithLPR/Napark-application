import { View, StyleSheet } from "react-native";

import BodyText from "../text/BodyText";
import HeaderText from "../text/HeaderText";
import SubHeaderText from "../text/SubHeaderText";

import Colors from "@/constants/color";

export interface activeSessionProps {
  licensePlate: string;
  space: string;
  timeRemaining: string;
}

const ActiveSession: React.FC<activeSessionProps> = ({
  licensePlate,
  space,
  timeRemaining,
}) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.topContainer}>
        <HeaderText text={licensePlate} textStyle={{ color: Colors.black }} />
        <BodyText text={space} textStyle={{ color: Colors.gray[800] }} />
      </View>
      <View style={styles.bottomContainer}>
        <SubHeaderText
          text="Time Remaining"
          textStyle={{ color: Colors.gray[800] }}
        />
        <SubHeaderText
          text={timeRemaining}
          textStyle={{ color: Colors.gray[800] }}
        />
      </View>
    </View>
  );
};

export default ActiveSession;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    marginHorizontal: 10,
    marginBottom: 20,
    height: "auto",
    backgroundColor: Colors.white,
    borderRadius: 8,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
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
