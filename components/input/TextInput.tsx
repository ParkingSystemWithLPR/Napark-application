import { StyleSheet, View, TextInput } from "react-native";

import SubHeaderText from "../text/SubHeaderText";
import BodyText from "../text/BodyText";
import Colors from "../../constants/color";

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
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.gray[800],
    borderRadius: 8,
    padding: 8,
    fontFamily: "Poppins-Medium",
    fontSize: 12,
  },
  errorText: {
    color: Colors.red[400],
  },
  requiredIndicator: {
    color: Colors.red[400],
  },
});
