import { StyleSheet, TouchableOpacity, View } from "react-native";
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
    <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
      <View style={styles.container}>
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
    </TouchableOpacity>
  );
};

export default CarInfoCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: Colors.gray[100],
    borderWidth: 1,
    borderColor: Colors.gray[500],
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoContainer: {},
  licenseText: {
    color: Colors.black,
  },
});
