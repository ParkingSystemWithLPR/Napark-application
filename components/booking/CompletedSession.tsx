import { View, StyleSheet, Platform } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Colors from "../../constants/color";
import BodyText from "../text/BodyText";
import HeaderText from "../text/HeaderText";
import SubHeaderText from "../text/SubHeaderText";

export interface completedSessionProps {
  licensePlate: string;
  space: string;
  date: string;
  time: string;
  price: string;
}

const CompletedSession: React.FC<completedSessionProps> = ({
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
          <BodyText text={space} textStyle={{ color: Colors.gray[800] }} />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <SubHeaderText text={date} textStyle={{ color: Colors.gray[800] }} />
        <SubHeaderText text={time} textStyle={{ color: Colors.gray[800] }} />
        <SubHeaderText
          text={`$${price}`}
          textStyle={{ color: Colors.gray[800], fontWeight: "bold" }}
        />
      </View>
    </View>
  );
};

export default CompletedSession;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    marginBottom: 20,
    marginHorizontal: 10,
    height: "auto",
    backgroundColor: Colors.white,
    borderRadius: 8,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: Platform.OS === "android" ? 4 : 2,
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
