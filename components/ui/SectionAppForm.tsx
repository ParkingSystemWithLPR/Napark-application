import { ReactNode } from "react";
import { View, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import BodyText from "../text/BodyText";

import Colors from "@/constants/color";

type SectionAppFormProps = {
  title: string;
  icon: string;
  children: ReactNode;
};

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
          />
        </View>
        <BodyText text={title} />
      </View>
      <View style={styles.contentContainer}>{children}</View>
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
    paddingLeft: 30,
  },
});
