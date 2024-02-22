import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Colors from "../../constants/color";
import SubHeaderText from "../text/SubHeaderText";
import BodyText from "../text/BodyText";

export type DayInputProps = {
  title: string;
  value: string;
  editable?: boolean;
  outerContainerStyle?: object;
  containerStyle?: object;
};

const DayInput: React.FC<DayInputProps> = ({
  title,
  value,
  editable = false,
  outerContainerStyle,
  containerStyle,
}) => {
  const [isOpenDayPicker, setOpenDayPicker] = useState<boolean>(false);

  const openDayPicker = () => {
    setOpenDayPicker(editable && true);
  };

  return (
    <View style={[styles.outerContainer, outerContainerStyle]}>
      <View>
        <SubHeaderText text={title} />
        <Pressable onPress={openDayPicker}>
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
            <MaterialCommunityIcons name="calendar-month-outline" />
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default DayInput;

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
