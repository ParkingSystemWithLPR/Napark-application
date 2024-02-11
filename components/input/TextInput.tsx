import { StyleSheet, View, TextInput } from "react-native";

import SubHeaderText from "../text/SubHeaderText";
import BodyText from "../text/BodyText";

export type TextInputProps = {
  title: string;
  placeholder: string;
  isRequired?: boolean;
  secureTextEntry?: boolean;
  errorText?: string;
  containerStyle?: object;
  textInputStyle?: object;
};

const MyTextInput: React.FC<TextInputProps> = ({
  title,
  placeholder,
  isRequired = false,
  secureTextEntry = false,
  errorText,
  containerStyle,
  textInputStyle,
}) => (
  <View style={[styles.inputContainer, containerStyle]}>
    <View style={styles.titleContainer}>
      <SubHeaderText text={title} />
      {isRequired && <BodyText text="*" textStyle={styles.requiredIndicator} />}
    </View>
    <TextInput
      style={[styles.input, textInputStyle]}
      secureTextEntry={secureTextEntry}
      placeholder={placeholder}
    />
    {errorText && <BodyText text={errorText} textStyle={styles.errorText} />}
  </View>
);

export default MyTextInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 10,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#7F7F7F",
    borderRadius: 8,
    padding: 8,
    fontFamily: "Poppins-Medium",
    fontSize: 12,
  },
  errorText: {
    color: "#F14951",
  },
  requiredIndicator: {
    color: "#F14951",
  },
});
