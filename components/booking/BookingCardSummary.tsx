import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet, Pressable } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Colors from "../../constants/color";
import BodyText from "../text/BodyText";
import SubHeaderText from "../text/SubHeaderText";

export type BookingCardSummaryProps = {
  checkInDate: string;
  checkInTime: string;
  specification: string | undefined;
  openSetting: () => void;
};
const BookingCardSummary: React.FC<BookingCardSummaryProps> = ({
  checkInDate,
  checkInTime,
  specification,
  openSetting,
}) => {
  type DetailProps = {
    topic: string;
    value: string;
  };
  const Detail: React.FC<DetailProps> = ({ topic, value }) => {
    return (
      <View style={styles.detailContainer}>
        <BodyText text={topic} />
        <BodyText text={value} />
      </View>
    );
  };
  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <MaterialCommunityIcons
            name="information-outline"
            style={styles.icon}
          />
          <SubHeaderText
            text={"Booking Details"}
            containerStyle={styles.headerStyle}
          />
        </View>
        <Pressable onPress={openSetting}>
          <Ionicons name="settings-outline" style={styles.icon} />
        </Pressable>
      </View>
      <View style={styles.propertyContainer}>
        <Detail topic={"Check-in:"} value={checkInDate + " " + checkInTime} />
        <Detail topic={"Specifications:"} value={specification ?? "None"} />
      </View>
    </View>
  );
};
export default BookingCardSummary;
const styles = StyleSheet.create({
  outerContainer: {
    paddingHorizontal: 8,
    borderRadius: 12,
    backgroundColor: Colors.white,
    elevation: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: Colors.red[400],
    paddingVertical: 10,
  },
  detailContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  propertyContainer: { gap: 10, marginVertical: 10 },
  icon: { fontSize: 20 },
  headerStyle: { marginLeft: 5 },
});
