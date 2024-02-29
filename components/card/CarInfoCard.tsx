import { Pressable, StyleSheet, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Colors from "../../constants/color";
import HeaderText from "../text/HeaderText";
import SubHeaderText from "../text/SubHeaderText";

export type CarInfoCardProps = {
  licensePlate: string;
  province: string;
  onPress: () => void;
};

const CarInfoCard: React.FC<CarInfoCardProps> = ({
  licensePlate,
  province,
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <Pressable
        android_ripple={{ color: Colors.gray[600] }}
        style={({ pressed }) => [pressed && styles.pressed]}
        onPress={onPress}
      >
        <View style={styles.innerContainer}>
          <View style={styles.infoContainer}>
            <HeaderText text={licensePlate} textStyle={styles.licenseText} />
            <SubHeaderText text={province} />
          </View>
          <MaterialCommunityIcons
            name="chevron-right"
            size={20}
            color={Colors.gray[800]}
          />
        </View>
      </Pressable>
    </View>
  );
};

export default CarInfoCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    borderRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    marginVertical: 5,
  },
  innerContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  infoContainer: {},
  licenseText: {
    color: Colors.black,
  },
  pressed: {
    opacity: 0.5,
  },
});
