import { Pressable, StyleSheet, View } from "react-native";

import BodyText from "../text/BodyText";

import Colors from "@/constants/color";

export type StepperProps = {
  step: number;
  setStep: (step: number) => void;
};

const Stepper: React.FC<StepperProps> = ({ step, setStep }) => {
  return (
    <View style={styles.container}>
      <Pressable
        key={1}
        android_ripple={{ color: Colors.gray[600] }}
        style={({ pressed }) => [
          step == 1 ? styles.selected : styles.idle,
          pressed ? styles.buttonPressed : null,
        ]}
        onPress={() => {setStep(1)}}
      >
        <BodyText
          text={"1"}
          textStyle={step == 1 ? styles.textSelected : {}}
        />
      </Pressable>
      <BodyText
        text={"-"}
        textStyle={step != 1 ? styles.linePassed : {}}
      />
      <Pressable
        key={2}
        android_ripple={{ color: Colors.gray[600] }}
        style={({ pressed }) => [
          step == 2 ? styles.selected : styles.idle,
          pressed ? styles.buttonPressed : null,
        ]}
        onPress={() => {setStep(2)}}
      >
        <BodyText
          text={"2"}
          textStyle={step == 2 ? styles.textSelected : {}}
        />
      </Pressable>
      <BodyText
        text={"-"}
        textStyle={step == 3 ? styles.linePassed : {}}
      />
      <Pressable
        key={3}
        android_ripple={{ color: Colors.gray[600] }}
        style={({ pressed }) => [
          step == 3 ? styles.selected : styles.idle,
          pressed ? styles.buttonPressed : null,
        ]}
        onPress={() => {setStep(3)}}
      >
        <BodyText
          text={"3"}
          textStyle={step == 3 ? styles.textSelected : {}}
        />
      </Pressable>
    </View>
  );
};

export default Stepper;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
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
  linePassed: {
    color: Colors.gray[800]
  },
});