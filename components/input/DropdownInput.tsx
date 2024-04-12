import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

import BodyText from "../text/BodyText";
import SubHeaderText from "../text/SubHeaderText";

import Colors from "@/constants/color";

export interface DropdownItem<T> {
  label: string;
  value: T;
}

export type DropdownInputProps<T> = {
  selectedValue?: DropdownItem<T> | string;
  placeholder: string;
  onSelect?: (selected: T) => void; //shortcut for use dropdown item type string
  onSpecialSelect?: (selected: DropdownItem<T>) => void;
  items: DropdownItem<T>[];
  withTitle?: boolean;
  title?: string;
  isRequired?: boolean;
  withSearch?: boolean;
  renderItem?: (item: DropdownItem<T>) => JSX.Element;
  errorText?: string;
  editable?: boolean;
  containerStyle?: object;
};

const DropdownInput = <T,>({
  selectedValue,
  placeholder,
  onSelect,
  onSpecialSelect,
  items,
  withTitle = true,
  title,
  isRequired = false,
  withSearch = false,
  renderItem,
  errorText,
  editable = true,
  containerStyle,
}: DropdownInputProps<T>) => {
  const handleOnChange = (item: DropdownItem<T>) => {
    if (onSpecialSelect) {
      onSpecialSelect(item);
    } else if (onSelect) {
      onSelect(item.value);
    }
  };
  return (
    <View style={containerStyle}>
      {withTitle && title && (
        <View style={styles.titleContainer}>
          <SubHeaderText text={title} />
          {isRequired && (
            <BodyText text="*" textStyle={styles.requiredIndicator} />
          )}
        </View>
      )}
      <Dropdown
        value={selectedValue}
        data={items}
        labelField={"label"}
        valueField={"value"}
        placeholder={placeholder}
        onChange={handleOnChange}
        search={withSearch}
        searchPlaceholder="Search..."
        style={[
          styles.dropdown,
          editable ? null : styles.uneditable,
          errorText ? styles.errorInputContainer : null,
        ]}
        selectedTextStyle={styles.text}
        activeColor={Colors.red[400].toString()}
        autoScroll={false}
        renderItem={renderItem}
        placeholderStyle={styles.placeholderText}
        disable={!editable}
        iconStyle={{
          tintColor: editable ? Colors.gray[800] : Colors.gray[600],
        }}
      />
      {errorText && <BodyText text={errorText} textStyle={styles.errorText} />}
    </View>
  );
};

export default DropdownInput;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  requiredIndicator: {
    color: Colors.red[400],
  },
  dropdown: {
    marginVertical: 4,
    height: 50,
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 12,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  text: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
  },
  placeholderText: {
    color: Colors.gray[600],
  },
  uneditable: {
    borderColor: Colors.gray[400],
    backgroundColor: Colors.gray[200],
  },
  errorInputContainer: {
    borderColor: Colors.red[600],
  },
  errorText: {
    color: Colors.red[400],
    fontSize: 12,
  },
});
