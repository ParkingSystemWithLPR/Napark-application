import { View, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Colors from "../../constants/color";
import BodyText from "../text/BodyText";
import HeaderText from "../text/HeaderText";
import SubHeaderText from "../text/SubHeaderText";

interface completedTimeSlotProps {
  licensePlate: string;
  space: string;
  date: string;
  time: string;
  price: string;
}

const CompletedTimeSlot: React.FC<completedTimeSlotProps> = ({
  licensePlate,
  space,
  date,
  time,
  price,
}) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.topContainer}>
        <View style={styles.icon}>
          <MaterialCommunityIcons
            name="check-circle"
            size={40}
            color={Colors.green[600]}
          />
        </View>
        <View style={styles.licenseAndLocation}>
          <HeaderText
            text={licensePlate}
            textStyle={{ color: Colors.black, fontWeight: "bold" }}
          />
          <BodyText text={space} textStyle={{ color: Colors.gray[900] }} />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <SubHeaderText text={date} textStyle={{ color: Colors.gray[900] }} />
        <SubHeaderText text={time} textStyle={{ color: Colors.gray[900] }} />
        <SubHeaderText
          text={`$${price}`}
          textStyle={{ color: Colors.gray[900], fontWeight: "bold" }}
        />
      </View>
    </View>
  );
};

export default CompletedTimeSlot;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    marginBottom: 20,
    height: "auto",
    backgroundColor: Colors.white,
    borderRadius: 8,
    shadowColor: Colors.black,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  topContainer: {
    paddingTop: 5,
    paddingBottom: 5,
    borderBottomColor: Colors.gray[700],
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icon: {
    alignSelf: "center",
  },
  licenseAndLocation: {
    alignItems: "flex-end",
  },
  bottomContainer: {
    paddingTop: 5,
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
