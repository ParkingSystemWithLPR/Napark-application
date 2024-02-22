import { ReactNode } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../constants/color";
import SubHeaderText from "../text/SubHeaderText";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

type SectionAppFormProps = {
  title: string;
  icon: string;
  children: ReactNode;
}

const SectionAppForm: React.FC<SectionAppFormProps> = ({
  children,
  title,
  icon,
}) => {
  return (
    <View>
      <View style={styles.headerContainer}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name={icon}
            size={20}
            color={Colors.red[400]}
            // style={styles.icon}
          />
        </View>
        <SubHeaderText text={title}/>
      </View>
      <View style={styles.contentContainer}>
        {children}
      </View>
    </View>
  );
};

export default SectionAppForm;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 3,
  },
  iconContainer: {
    padding: 3,
    borderRadius: 100,
    backgroundColor: Colors.gray[100],
  },
  contentContainer: {
    paddingLeft: 12,
  }
});
