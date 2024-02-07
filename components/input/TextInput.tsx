import { StyleSheet, View, TextInput } from "react-native";

import SubHeaderText from "../text/SubHeaderText";

export type TextInputProps = {
  title: string;
  placeholder: string;
  secureTextEntry?: boolean;
  containerStyle?: object;
  textInputStyle?: object;
};

const MyTextInput: React.FC<TextInputProps> = ({
  title,
  placeholder,
  secureTextEntry = false,
  containerStyle,
  textInputStyle,
}) => (
  <View style={[styles.inputContainer, containerStyle]}>
    <SubHeaderText text={title} />
    <TextInput
      style={[styles.input, textInputStyle]}
      secureTextEntry={secureTextEntry}
      placeholder={placeholder}
    />
  </View>
);

export default MyTextInput;

const styles = StyleSheet.create({
  inputContainer: {
    gap: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#7F7F7F",
    borderRadius: 8,
    padding: 8,
    fontFamily: "Poppins-Medium",
    fontSize: 12,
  },
});
