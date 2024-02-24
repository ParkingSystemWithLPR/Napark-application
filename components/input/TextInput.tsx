import { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Colors from "../../constants/color";
import BodyText from "../text/BodyText";
import SubHeaderText from "../text/SubHeaderText";

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

export enum AutoCapitalizeType {
  None = "none",
  Sentences = "sentences",
  Words = "words",
  Characters = "characters",
}

export type InputValueType = {
  value: string;
  errorText?: string;
};

export type TextInputProps = {
  title: string;
  placeholder: string;
  value: string;
  onChangeText: (enteredValue: string) => void;
  autoCapitalize?: AutoCapitalizeType;
  inputMode?: InputType;
  isRequired?: boolean;
  multiline?: boolean;
  secureTextEntry?: boolean;
  errorText?: string;
  editable?: boolean;
  containerStyle?: object;
  textInputStyle?: object;
};

const MyTextInput: React.FC<TextInputProps> = ({
  title,
  placeholder,
  value,
  onChangeText,
  autoCapitalize = AutoCapitalizeType.None,
  inputMode = InputType.Text,
  multiline = false,
  isRequired = false,
  secureTextEntry = false,
  editable = true,
  errorText,
  containerStyle,
  textInputStyle,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(!secureTextEntry);

  const toggleSecureEntry = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <View style={[styles.outerContainer, containerStyle]}>
      <View style={styles.titleContainer}>
        <SubHeaderText text={title} />
        {isRequired && (
          <BodyText text="*" textStyle={styles.requiredIndicator} />
        )}
      </View>
      <View
        style={[
          styles.inputContainer,
          editable ? null : styles.uneditable,
          errorText ? styles.errorInputContainer : null,
        ]}
      >
        <TextInput
          style={[
            styles.input,
            textInputStyle,
            editable ? undefined : styles.uneditableText,
          ]}
          autoCapitalize={autoCapitalize}
          secureTextEntry={!showPassword}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          inputMode={inputMode}
          multiline={multiline}
          editable={editable}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={toggleSecureEntry}>
            <MaterialCommunityIcons
              name={showPassword ? "eye-off" : "eye"}
              size={20}
              color={Colors.gray[800]}
              style={styles.icon}
            />
          </TouchableOpacity>
        )}
      </View>
      {errorText && <BodyText text={errorText} textStyle={styles.errorText} />}
    </View>
  );
};

export default MyTextInput;

const styles = StyleSheet.create({
  outerContainer: {
    marginBottom: 10,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.gray[800],
    borderRadius: 8,
    padding: 8,
    paddingVertical: Platform.OS === "android" ? 5 : null,
  },
  input: {
    flex: 1,
    fontFamily: "Poppins-Medium",
    fontSize: 12,
  },
  icon: {
    marginLeft: 5,
  },
  errorInputContainer: {
    borderColor: Colors.red[600],
  },
  errorText: {
    color: Colors.red[400],
    fontSize: 12,
  },
  requiredIndicator: {
    color: Colors.red[400],
  },
  uneditable: {
    borderColor: Colors.gray[400],
    backgroundColor: Colors.gray[200],
  },
  uneditableText: {
    color: Colors.gray[800],
  },
});
