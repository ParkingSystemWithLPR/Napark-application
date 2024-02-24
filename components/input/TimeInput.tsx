import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Colors from "../../constants/color";
import SubHeaderText from "../text/SubHeaderText";
import BodyText from "../text/BodyText";

export type TimeInputProps = {
  title: string;
  value: string;
  editable?: boolean;
  outerContainerStyle?: object;
  containerStyle?: object;
};

const TimeInput: React.FC<TimeInputProps> = ({
  title,
  value,
  editable = false,
  outerContainerStyle,
  containerStyle,
}) => {
  const [isOpenTimePicker, setOpenTimePicker] = useState<boolean>(false);

  const openTimePicker = () => {
    setOpenTimePicker(editable && true);
  };

  return (
    <View style={[styles.outerContainer, outerContainerStyle]}>
      <SubHeaderText text={title} />
      <Pressable onPress={openTimePicker}>
        <View
          style={[
            styles.container,
            editable ? null : styles.uneditable,
            containerStyle,
          ]}
        >
          <BodyText
            text={value}
            containerStyle={styles.dateTextContainer}
            textStyle={editable ? undefined : styles.uneditableText}
          />
          <MaterialCommunityIcons name="clock-outline" />
        </View>
      </Pressable>
    </View>
  );
};

export default TimeInput;

const styles = StyleSheet.create({
  outerContainer: {},
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 5,
    borderWidth: 1,
    borderColor: Colors.gray[800],
    borderRadius: 8,
    padding: 8,
  },
  dateTextContainer: {},
  uneditable: {
    borderColor: Colors.gray[400],
    backgroundColor: Colors.gray[200],
  },
  uneditableText: {
    color: Colors.gray[800],
  },
});
