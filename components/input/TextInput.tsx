import { StyleSheet, View, TextInput } from "react-native";

import SubHeaderText from "../text/SubHeaderText";
import BodyText from "../text/BodyText";
import Colors from "../../constants/color";

export enum InputType {
  Decimal = "decimal",
  Email = "email",
  None = "none",
  Numeric = "numeric",
  Search = "search",
  Tel = "tel",
  Text = "text",
  URL = "url",
}

export type TextInputProps = {
  title: string;
  placeholder: string;
  value: string;
  onChangeText: (enteredValue: string) => void;
  inputMode?: InputType;
  isRequired?: boolean;
  multiline?: boolean;
  secureTextEntry?: boolean;
  errorText?: string;
  containerStyle?: object;
  textInputStyle?: object;
};

const MyTextInput: React.FC<TextInputProps> = ({
  title,
  placeholder,
  value,
  onChangeText,
  inputMode = InputType.None,
  multiline = false,
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
      value={value}
      onChangeText={onChangeText}
      inputMode={inputMode}
      multiline={multiline}
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
