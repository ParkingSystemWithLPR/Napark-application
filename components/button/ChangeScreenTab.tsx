import { StyleSheet, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Colors from "../../constants/color";
import SubHeaderText from "../text/SubHeaderText";

export type ChangeScreenTabProps = {
  icon: string;
  screenName: string;
};

const ChangeScreenTab: React.FC<ChangeScreenTabProps> = ({
  icon,
  screenName,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.5}>
      <View style={styles.tabContainer}>
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={Colors.gray[900]}
          style={styles.icon}
        />
        <SubHeaderText
          text={screenName}
          containerStyle={styles.textContainer}
        />
        <MaterialCommunityIcons
          name="chevron-right"
          size={20}
          color={Colors.gray[900]}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ChangeScreenTab;

const styles = StyleSheet.create({
  tabContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.gray[100],
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.gray[500],
  },
  icon: {
    marginHorizontal: 10,
  },
  textContainer: {
    flex: 1,
  },
});
