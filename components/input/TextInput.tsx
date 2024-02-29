import { ReactNode, useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Colors from "../../constants/color";
import { AutoCapitalizeType } from "../../enum/AutoCapitalizeType";
import { InputType } from "../../enum/InputType";
import BodyText from "../text/BodyText";
import SubHeaderText from "../text/SubHeaderText";

export type InputValueType = {
  value: string;
  errorText?: string;
};

export type TextInputProps = {
  placeholder: string;
  value: string;
  onChangeText: (enteredValue: string) => void;
  title?: string;
  prefix?: string;
  withTitle?: boolean;
  icon?: ReactNode;
  autoCapitalize?: AutoCapitalizeType;
  inputMode?: InputType;
  isRequired?: boolean;
  multiline?: boolean;
  secureTextEntry?: boolean;
  errorText?: string;
  editable?: boolean;
  containerStyle?: object;
  textInputStyle?: object;
  onSubmitEditing?: (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => void;
};

const MyTextInput: React.FC<TextInputProps> = ({
  title,
  placeholder,
  value,
  prefix,
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
  withTitle = true,
  icon,
  onSubmitEditing,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(!secureTextEntry);

  const toggleSecureEntry = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <View style={[styles.outerContainer, containerStyle]}>
      {withTitle && title && (
        <View style={styles.titleContainer}>
          <SubHeaderText text={title} />
          {isRequired && (
            <BodyText text="*" textStyle={styles.requiredIndicator} />
          )}
        </View>
      )}
      <View
        style={[
          styles.inputContainer,
          editable ? null : styles.uneditable,
          errorText ? styles.errorInputContainer : null,
        ]}
      >
        {prefix && (
          <BodyText text={prefix} containerStyle={styles.prefixContainer} />
        )}
        <TextInput
          style={[
            styles.input,
            textInputStyle,
            editable ? undefined : styles.uneditableText,
          ]}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
          secureTextEntry={!showPassword}
          placeholder={placeholder}
          placeholderTextColor={Colors.gray[600]}
          value={value}
          onChangeText={onChangeText}
          inputMode={inputMode}
          multiline={multiline}
          editable={editable}
          onSubmitEditing={onSubmitEditing}
        />
        {secureTextEntry ? (
          <TouchableOpacity onPress={toggleSecureEntry}>
            <MaterialCommunityIcons
              name={showPassword ? "eye-off" : "eye"}
              size={20}
              color={Colors.gray[800]}
              style={styles.icon}
            />
          </TouchableOpacity>
        ) : (
          icon
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
    borderRadius: 8,
    padding: 8,
    paddingVertical: Platform.OS === "android" ? 13 : 16,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    marginVertical: 4,
  },
  input: {
    flex: 1,
    fontFamily: "Poppins-Medium",
    fontSize: 14,
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
  prefixContainer: {
    marginRight: 5,
  },
});
