import { Platform, StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

import BodyText from "../text/BodyText";
import SubHeaderText from "../text/SubHeaderText";

import Colors from "@/constants/color";

export interface DropdownItem {
  label: string;
  value: string;
}

export type DropdownInputProps = {
  selectedValue: string;
  placeholder: string;
  onSelect: (selected: string) => void;
  items: DropdownItem[];
  withTitle?: boolean;
  title?: string;
  isRequired?: boolean;
  withSearch?: boolean;
};

const DropdownInput: React.FC<DropdownInputProps> = ({
  selectedValue,
  placeholder,
  onSelect,
  items,
  withTitle = true,
  title,
  isRequired = false,
  withSearch = false,
}) => {
  return (
    <View>
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
        searchField={"value"}
        placeholder={placeholder}
        onChange={(item: DropdownItem) => onSelect(item.value)}
        search={withSearch}
        searchPlaceholder="Search..."
        style={styles.dropdown}
        selectedTextStyle={styles.text}
        activeColor={Colors.red[400].toString()}
        autoScroll={false}
      />
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
    elevation: Platform.OS === "android" ? 4 : 2,
  },
  text: {
    fontSize: 14,
  },
});
