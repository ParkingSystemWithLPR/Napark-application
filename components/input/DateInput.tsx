import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import Colors from "../../constants/color";
import BodyText from "../text/BodyText";
import SubHeaderText from "../text/SubHeaderText";


export type DateInputProps = {
  title: string;
  // date: string | null;
  // placeholder?: string;
  // onChange: (date: string) => void;
  // setMinimumDate?: boolean;
  editable?: boolean;
};

type dayPickerInput = {
  [day: string]: boolean;
};

const DateInput: React.FC<DateInputProps> = ({
  title,
}) => {
  const [isChecked, setChecked] = useState<dayPickerInput>({
    Mo: false,
    Tu: false,
    We: false,
    Th: false,
    Fr: false,
    Sa: false,
    Su: false,
  });

  return (
    <View style={styles.outerContainer}>
      <SubHeaderText text={title} />
      <View style={styles.container}>
      <Pressable
        android_ripple={{ color: Colors.gray[600] }}
        style={({ pressed }) => [
          isChecked["Su"] ? styles.selected : styles.idle,
          pressed ? styles.buttonPressed : null,
        ]}
        onPress={() => setChecked({ ...isChecked, Su: !isChecked["Su"] })}
      >
          <BodyText
            text={"Su"}
            textStyle={isChecked["Su"] ? styles.textSelected : {}}
          />
        </Pressable>
        <Pressable
          onPress={() => setChecked({ ...isChecked, Mo: !isChecked["Mo"] })}
          style={isChecked["Mo"] ? styles.selected : styles.idle}
        >
          <BodyText
            text={"Mo"}
            textStyle={isChecked["Mo"] ? styles.textSelected : {}}
          />
        </Pressable>
        <Pressable
          onPress={() => setChecked({ ...isChecked, Tu: !isChecked["Tu"] })}
          style={isChecked["Tu"] ? styles.selected : styles.idle}
        >
          <BodyText
            text={"Tu"}
            textStyle={isChecked["Tu"] ? styles.textSelected : {}}
          />
        </Pressable>
        <Pressable
          onPress={() => setChecked({ ...isChecked, We: !isChecked["We"] })}
          style={isChecked["We"] ? styles.selected : styles.idle}
        >
          <BodyText
            text={"We"}
            textStyle={isChecked["We"] ? styles.textSelected : {}}
          />
        </Pressable>
        <Pressable
          onPress={() => setChecked({ ...isChecked, Th: !isChecked["Th"] })}
          style={isChecked["Th"] ? styles.selected : styles.idle}
        >
          <BodyText
            text={"Th"}
            textStyle={isChecked["Th"] ? styles.textSelected : {}}
          />
        </Pressable>
        <Pressable
          onPress={() => setChecked({ ...isChecked, Fr: !isChecked["Fr"] })}
          style={isChecked["Fr"] ? styles.selected : styles.idle}
        >
          <BodyText
            text={"Fr"}
            textStyle={isChecked["Fr"] ? styles.textSelected : {}}
          />
        </Pressable>
        <Pressable
          onPress={() => setChecked({ ...isChecked, Sa: !isChecked["Sa"] })}
          style={isChecked["Sa"] ? styles.selected : styles.idle}
        >
          <BodyText
            text={"Sa"}
            textStyle={isChecked["Sa"] ? styles.textSelected : {}}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default DateInput;

const styles = StyleSheet.create({
  outerContainer: {
    gap: 10,
    marginBottom: 10,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  idle: {
    borderRadius: 100,
    backgroundColor: Colors.white,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
  },
  selected: {
    borderRadius: 100,
    backgroundColor: Colors.red[400],
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
  },
  textSelected: {
    color: Colors.white,
  },
  button: {},
  buttonPressed: {
    opacity: 0.5,
  },
});
