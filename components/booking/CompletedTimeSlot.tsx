import { View, StyleSheet, Text } from "react-native";
import Colors from "../../constants/color";
import HeaderText from "../text/HeaderText";
import SubHeaderText from "../text/SubHeaderText";
import BodyText from "../text/BodyText";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const CompletedTimeSlot: React.FC<{}> = () => {
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
            text="กข 1234"
            textStyle={{ color: Colors.black, fontWeight: "bold" }}
          />
          <BodyText text="Space 4c" textStyle={{ color: Colors.gray[900] }} />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <SubHeaderText
          text="02/08/2019"
          textStyle={{ color: Colors.gray[900] }}
        />
        <SubHeaderText
          text="02:00 pm"
          textStyle={{ color: Colors.gray[900] }}
        />
        <SubHeaderText
          text="$100"
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
