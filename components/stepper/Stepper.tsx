import { FlatList, Pressable, StyleSheet, View } from "react-native";

import BodyText from "../text/BodyText";

import Colors from "@/constants/color";

export type StepperProps = {
  nowStep: number;
  setStep: (step: number) => void;
  stepAmount: number;
};

const Stepper: React.FC<StepperProps> = ({ nowStep, setStep, stepAmount }) => {
  const renderSteps = () => {
    const steps: JSX.Element[] = [];
    for (let step = 1; step <= stepAmount; step++) {
      steps.push(
        <View style={styles.container} key={step}>
          <Pressable
            android_ripple={{ color: Colors.gray[600] }}
            style={({ pressed }) => [
              nowStep === step ? styles.selected : styles.idle,
              pressed ? styles.buttonPressed : null,
            ]}
            disabled={step > nowStep}
            onPress={() => {
              setStep(step);
            }}
          >
            <BodyText
              text={`${step}`}
              textStyle={nowStep === step ? styles.textSelected : {}}
            />
          </Pressable>
          {step !== stepAmount && (
            <BodyText
              text={"-"}
              textStyle={nowStep > step ? styles.linePassed : {}}
            />
          )}
        </View>
      );
    }
    return steps;
  };

  return <View style={styles.container}>{renderSteps()}</View>;
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
    color: Colors.gray[800],
  },
});
