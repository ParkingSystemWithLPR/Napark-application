import { Pressable, StyleSheet, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import SubHeaderText from "../text/SubHeaderText";

import Colors from "@/constants/color";

export type ChangeScreenTabProps = {
  icon: string;
  screenName: string;
  onPress: () => void;
};

const ChangeScreenTab: React.FC<ChangeScreenTabProps> = ({
  icon,
  screenName,
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <Pressable
        android_ripple={{ color: Colors.gray[600] }}
        style={({ pressed }) => [pressed && styles.pressed]}
        onPress={onPress}
      >
        <View style={styles.tabContainer}>
          <MaterialCommunityIcons
            name={icon}
            size={20}
            color={Colors.gray[800]}
            style={styles.icon}
          />
          <SubHeaderText
            text={screenName}
            containerStyle={styles.textContainer}
          />
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

export default ChangeScreenTab;

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
    elevation: 4,
  },
  tabContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
  icon: {
    marginHorizontal: 10,
  },
  textContainer: {
    flex: 1,
  },
  pressed: {
    opacity: 0.5,
  },
});
